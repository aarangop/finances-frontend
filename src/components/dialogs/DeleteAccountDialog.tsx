import { components } from "@/api/schema";
import { useDeleteAccount } from "@/hooks/account";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

type Account = components["schemas"]["AccountSchema"];

interface DeleteAccountDialogProps {
  account: Account;
  open: boolean;
  handleDialogClose: () => void;
  redirectionPath?: string;
}

export default function DeleteAccountDialog({
  account,
  open,
  handleDialogClose,
  redirectionPath = "/finances/accounts",
}: DeleteAccountDialogProps) {
  const router = useRouter();

  const { mutate: deleteAccount } = useDeleteAccount({
    onSuccess: () => {
      router.push(redirectionPath);
    },
  });

  const handleDelete = () => {
    deleteAccount(account);
    handleDialogClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete '${account.account_alias}'?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          color="error"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
