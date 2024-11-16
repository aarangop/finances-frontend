import { components } from "@/api/schema";
import { useUpdateAccountBalance } from "@/hooks/account";
import { TextField } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";

type Account = components["schemas"]["AccountSchema"];
type FormValues = { balance: number };

export type BalanceUpdateFormRef = {
  submit: () => void;
};

interface BalanceUpdateFormProps {
  account: Account;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * A form component for updating the balance of an account.
 *
 * @component
 * @param {BalanceUpdateFormProps} props - The properties for the BalanceUpdateForm component.
 * @param {Object} props.account - The account object containing balance and currency information.
 * @param {Function} props.onSuccess - Callback function to be called on successful balance update.
 * @param {Function} props.onError - Callback function to be called on balance update error.
 * @param {React.Ref<BalanceUpdateFormRef>} ref - A ref object to access the form's imperative methods.
 *
 * @returns {JSX.Element} The rendered BalanceUpdateForm component.
 *
 * @example
 * // Usage example
 * <BalanceUpdateForm
 *   account={account}
 *   onSuccess={handleSuccess}
 *   onError={handleError}
 *   ref={formRef}
 * />
 *
 * @typedef {Object} BalanceUpdateFormRef
 * @property {Function} submit - Function to programmatically submit the form.
 *
 * @typedef {Object} BalanceUpdateFormProps
 * @property {Object} account - The account object containing balance and currency information.
 * @property {Function} onSuccess - Callback function to be called on successful balance update.
 * @property {Function} onError - Callback function to be called on balance update error.
 *
 * @typedef {Object} FormValues
 * @property {number} balance - The balance value to be updated.
 */
export default forwardRef<BalanceUpdateFormRef, BalanceUpdateFormProps>(
  function BalanceUpdateForm({ account, onSuccess, onError }, ref) {
    const updateMutation = useUpdateAccountBalance({
      account,
      onSuccess,
      onError,
    });

    const validationRules = {
      balance: {
        required: "Balance is required",
        min: { value: 0, message: "Balance must be positive" },
      },
    };

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({
      defaultValues: {
        balance: account.balance,
      },
    });

    const onSubmit = (data: FormValues) => {
      updateMutation.mutate({
        balance: Number(data.balance),
      });
    };

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(onSubmit)(),
    }));

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="balance"
          control={control}
          rules={validationRules.balance}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              margin="dense"
              label={`Balance in ${account.currency}`}
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.balance}
              helperText={errors.balance?.message}
            />
          )}
        />
      </form>
    );
  }
);
