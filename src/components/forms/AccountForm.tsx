"use client";

import { components } from "@/api/schema";
import ValidationFeedback from "@/components/forms/ValidationFeedback";
import CurrencySelect from "@/components/select/CurrencySelect";
import { useCreateAccount } from "@/hooks/account";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import IBAN from "iban";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type AccountCreate = components["schemas"]["AccountCreateSchema"];
type Account = components["schemas"]["AccountSchema"];

interface AccountFormProps {
  account: Account | null;
  enableDelete?: boolean;
}

/**
 * Renders a form for creating or editing an account.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Account} props.account - The account object to edit, or null if creating a new account.
 * @param {boolean} [props.enableDelete=false] - Whether to enable the delete button.
 * @returns {JSX.Element} The rendered AccountForm component.
 */
export default function AccountForm({
  account,
  enableDelete = false,
}: AccountFormProps) {
  const router = useRouter();

  const defaultValues: AccountCreate = account || {
    bank: "",
    holder: "",
    balance: 0,
    currency: "COP",
    account_number: "",
    account_alias: "",
    expenses: [],
  };

  const validationRules = {
    bank: { required: "Bank is required" },
    holder: { required: "Holder is required" },
    balance: { required: "Balance is required" },
    currency: { required: "Currency is required" },
    account_number: {
      required: "Account number or IBAN is required",
      validate: (value: string) => {
        const isIBAN = IBAN.isValid(value);
        if (isIBAN) return true;
        const accountNumberRegex = new RegExp(/^[0-9]{9,18}$/);
        if (accountNumberRegex.test(value)) return true;
        return "Invalid account number or IBAN";
      },
    },
    account_alias: { required: "Alias is required" },
  };

  const [saveDisabled, setSaveDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid: formIsValid },
  } = useForm<AccountCreate | Account>({ defaultValues, mode: "onBlur" });

  const onCreateAccountSuccess = (data: Account, variables: AccountCreate) => {
    const accountStr = `${data.bank} - ${data.account_number}`;
    enqueueSnackbar(
      `Account ${accountStr} created successfully.\nRedirecting to account in 5 seconds`,
      {
        variant: "success",
        autoHideDuration: 5000,
      }
    );
    setTimeout(() => {
      router.push(`/accounts/${data.id}`);
    }, 5000);
  };

  const onCreateAccountError = (error: Error) => {
    enqueueSnackbar(`Error creating account: ${error.message}`, {
      variant: "error",
      autoHideDuration: 5000,
    });
  };

  const {
    data: createAccountData,
    isPending: createAccountIsPending,
    status,
    isError: createAccountIsError,
    mutateAsync: createAccountAsync,
  } = useCreateAccount({
    onSuccess: onCreateAccountSuccess,
    onError: onCreateAccountError,
  });

  const onSubmit = async (data: AccountCreate | Account) => {
    if (!account) {
      createAccountAsync(data as AccountCreate);
      return;
    }
  };
  useEffect(() => {
    if (!formIsValid) {
      setSaveDisabled(true);
      return;
    }
    const requestsPending = createAccountIsPending;
    setSaveDisabled(requestsPending);
  }, [createAccountIsPending, formIsValid]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="account form"
      noValidate
    >
      <Card>
        <CardHeader
          title={
            account ? `Edit Account ${account.account_alias}` : "Create Account"
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="account_alias"
                  rules={validationRules.account_alias}
                  render={({ field }) => (
                    <TextField
                      required
                      error={!!errors.account_alias}
                      label="Account Alias"
                      {...field}
                    />
                  )}
                />
                <ValidationFeedback errors={errors} name="account_alias" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="holder"
                  rules={validationRules.holder}
                  render={({ field }) => (
                    <TextField
                      label="Holder"
                      error={!!errors.holder}
                      required
                      {...field}
                    />
                  )}
                />
                <ValidationFeedback errors={errors} name="holder" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="bank"
                  rules={validationRules.bank}
                  defaultValue={account?.bank || defaultValues.bank}
                  render={({ field }) => (
                    <TextField
                      required
                      error={!!errors.bank}
                      label="Bank"
                      {...field}
                    />
                  )}
                />
                <ValidationFeedback errors={errors} name="bank" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="account_number"
                  rules={validationRules.account_number}
                  render={({ field }) => (
                    <TextField
                      label="Account Number / IBAN"
                      required
                      error={!!errors.account_number}
                      {...field}
                    />
                  )}
                />
                <ValidationFeedback errors={errors} name="account_number" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" gap={2}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="balance"
                      rules={validationRules.balance}
                      render={({ field }) => (
                        <TextField
                          label="Balance"
                          required
                          error={!!errors.balance}
                          type="number"
                          {...field}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="currency"
                      rules={validationRules.currency}
                      defaultValue={account?.currency || defaultValues.currency}
                      render={({ field }) => (
                        <CurrencySelect
                          label="Currency"
                          labelId="currency-label"
                          field={field}
                          error={!!errors.currency}
                          defaultCurrency={"COP"}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
                <ValidationFeedback errors={errors} name="balance" />
                <ValidationFeedback errors={errors} name="currency" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type="submit" disabled={saveDisabled}>
            Save
          </Button>
          <Button onClick={router.back}>Cancel</Button>
          {enableDelete && (
            <Button color="error" endIcon={<DeleteIcon />}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
}
