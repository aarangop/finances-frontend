import { components } from "@/api/schema";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useRef } from "react";
import BalanceUpdateForm, {
  BalanceUpdateFormRef,
} from "../forms/BalanceUpdateForm";

type Account = components["schemas"]["AccountSchema"];

export default function UpdateAccountBalanceDialog({
  account,
  open = false,
  handleDialogClose,
}: {
  account: Account;
  open: boolean;
  handleDialogClose: () => void;
}) {
  const formRef = useRef<BalanceUpdateFormRef>(null);

  const handleSuccess = () => {
    enqueueSnackbar("Balance updated successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    handleDialogClose();
  };

  const handleError = (error: Error) => {
    enqueueSnackbar(`Failed to update balance: ${error.message}`, {
      variant: "error",
      autoHideDuration: 5000,
    });
  };

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle id="update-balance-dialog-title">
        {`Update Balance for '${account.account_alias}'`}
      </DialogTitle>
      <DialogContent>
        <BalanceUpdateForm
          ref={formRef}
          account={account}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
