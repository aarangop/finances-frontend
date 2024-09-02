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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import IBAN from "iban";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ValidationFeedback from "../ValidationFeedback";

type AccountCreate = components["schemas"]["AccountCreateSchema"];
type Account = components["schemas"]["AccountSchema"];

interface AccountFormProps {
  account: AccountCreate | Account | null;
  enableDelete?: boolean;
}

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
      required: "Number is required",
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
    console.log("Submitting account data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  render={({ field }) => <TextField label="Alias" {...field} />}
                />
                <ValidationFeedback error={errors} name="account_alias" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="holder"
                  rules={validationRules.holder}
                  render={({ field }) => (
                    <TextField label="Holder" {...field} />
                  )}
                />
                <ValidationFeedback error={errors} name="holder" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="bank"
                  rules={validationRules.bank}
                  render={({ field }) => <TextField label="Bank" {...field} />}
                />
                <ValidationFeedback error={errors} name="bank" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="account_number"
                  rules={validationRules.account_number}
                  render={({ field }) => (
                    <TextField label="Account Number / IBAN" {...field} />
                  )}
                />
                <ValidationFeedback error={errors} name="account_number" />
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
                          label="Current Balance"
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
                      render={({ field }) => (
                        <Select {...field}>
                          <MenuItem
                            value="COP"
                            sx={{ fontFamily: "monospace" }}
                          >
                            $ COP
                          </MenuItem>
                          <MenuItem
                            value="USD"
                            sx={{ fontFamily: "monospace" }}
                          >
                            $ USD
                          </MenuItem>
                          <MenuItem
                            value="EUR"
                            sx={{ fontFamily: "monospace" }}
                          >
                            € EUR
                          </MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Box>
                <ValidationFeedback error={errors} name="balance" />
                <ValidationFeedback error={errors} name="currency" />
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
