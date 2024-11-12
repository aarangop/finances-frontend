import { components } from "@/api/schema";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";

type Account = components["schemas"]["AccountSchema"];

export default function AccountDetailsCard({ account }: { account: Account }) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdateBalance = () => {
    // Implement update balance logic
  };

  const handleEditAccount = () => {
    // Implement edit account logic
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const spentThisMonth = 0; // Replace with actual value
  const spendingLimit = 1000; // Replace with actual value
  const spendingProgress = (spentThisMonth / spendingLimit) * 100;

  return (
    <>
      <DeleteAccountDialog
        account={account}
        open={isDeleteDialogOpen}
        handleDialogClose={handleCloseDeleteDialog}
      />
      <Card>
        <CardContent>
          <Typography variant="h4">{account.account_alias}</Typography>
          <Typography variant="subtitle1">{account.account_number}</Typography>
          <Typography variant="body1">{account.holder}</Typography>

          <Typography
            variant="body2"
            style={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            {account.currency} {account.balance}
          </Typography>
          <Box mt={2} flex={"row"}>
            <Typography variant="h6">Spent this month: </Typography>
            <Typography
              variant="h6"
              style={{ fontFamily: "monospace", fontWeight: "bold" }}
              mb={2}
            >
              {spentThisMonth}
            </Typography>
            <LinearProgress variant="determinate" value={spendingProgress} />
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Tooltip title="Update account balance">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleUpdateBalance}
                  >
                    Update Balance
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Edit account details">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleEditAccount}
                  >
                    Edit Account
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete this account">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
