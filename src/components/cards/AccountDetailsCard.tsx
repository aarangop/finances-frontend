"use client";

import { components } from "@/api/schema";
import { maskAccountNumber } from "@/utils/account";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountBalanceHistoryChart from "../charts/AccountBalanceHistoryChart";
import AccountBalanceMiniChart from "../charts/AccountBalanceMiniChart";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import UpdateAccountBalanceDialog from "../dialogs/UpdateAccountBalanceDialog";
import AccountBalanceIndicator from "../indicators/AccountBalanceIndicator";

type Account = components["schemas"]["AccountSchema"];

export default function AccountDetailsCard({ account }: { account: Account }) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isHistoryChartOpen, setIsHistoryChartOpen] = useState(false);
  const router = useRouter();

  const handleUpdateBalance = () => {
    setUpdateDialogOpen(true);
  };

  const handleUpdateBalanceDialogClose = () => {
    setUpdateDialogOpen(false);
  };

  const handleEditAccount = () => {
    router.push(`/finances/accounts/edit/${account.id}`);
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <UpdateAccountBalanceDialog
        account={account}
        open={isUpdateDialogOpen}
        handleDialogClose={handleUpdateBalanceDialogClose}
      />
      <DeleteAccountDialog
        account={account}
        open={isDeleteDialogOpen}
        handleDialogClose={handleCloseDeleteDialog}
      />
      <Dialog
        open={isHistoryChartOpen}
        onClose={() => setIsHistoryChartOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <AccountBalanceHistoryChart account={account} />
      </Dialog>
      <Card>
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* Header */}
          <Typography variant="h4" sx={{ mb: 2 }}>
            {account.account_alias}
          </Typography>

          {/* Scrollable main content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 1,
            }}
          >
            <Grid container spacing={2}>
              {/* Account info */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {maskAccountNumber(account.account_number)}
                </Typography>
                <Typography variant="body1">{account.holder}</Typography>

                <Box display="flex" alignItems="center" mt={2}>
                  <AccountBalanceIndicator
                    key={`account-details-card-balance-indicator-${account.id}`}
                    account={account}
                  />
                  <Box mx={2}>
                    <AccountBalanceMiniChart
                      accountId={account.id}
                      onClick={() => {}}
                      onDoubleClick={() => setIsHistoryChartOpen(true)}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Action buttons */}
          <Box
            sx={{
              pt: 2,
            }}
          >
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
