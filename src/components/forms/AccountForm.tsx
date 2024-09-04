"use client";

import { components } from "@/api/schema";
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
import { Controller, useForm } from "react-hook-form";
import CurrencySelect from "../io/CurrencySelect";
import ValidationFeedback from "../io/ValidationFeedback";

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCreate>({ defaultValues });

  const onSubmit = (data: AccountCreate | Account) => {
    console.log(data);
  };

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
          <Button type="submit">Save</Button>
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
