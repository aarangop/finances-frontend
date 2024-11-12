import { components } from "@/api/schema";
import { useUpdateAccountBalance } from "@/hooks/account";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

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
  const [balance, setBalance] = useState(account.balance);
  const onBalanceUpdated = () => {
    handleDialogClose();
  };

  const updateMutation = useUpdateAccountBalance({
    account,
    newBalance: balance,
    onSuccess: onBalanceUpdated,
  });

  const updateBalance = () => {
    updateMutation.mutate({ amount: balance });
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle id="update-balance-dialog-title">
        {`Update Balance for '${account.account_alias}'`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="balance"
          label="Balance"
          type="number"
          fullWidth
          variant="standard"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={updateBalance} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
