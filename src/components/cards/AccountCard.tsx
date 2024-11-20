"use client";

import { components } from "@/api/schema";
import { usePrefetchAccount } from "@/hooks/account";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountBalanceMiniChart from "../charts/AccountBalanceMiniChart";
import UpdateAccountBalanceDialog from "../dialogs/UpdateAccountBalanceDialog";
import AccountBalanceIndicator from "../indicators/AccountBalanceIndicator";

type Account = components["schemas"]["AccountSchema"];

export default function AccountCard({ account }: { account: Account }) {
  const router = useRouter();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleUpdateBalance = (event: React.MouseEvent) => {
    event.stopPropagation();
    setUpdateDialogOpen(true);
  };

  const formattedBalance = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(account.balance);

  const prefetchAccountDetails = usePrefetchAccount(account.id);
  prefetchAccountDetails();

  return (
    <>
      <UpdateAccountBalanceDialog
        account={account}
        open={updateDialogOpen}
        handleDialogClose={() => {
          setUpdateDialogOpen(false);
        }}
      />
      <Tooltip title="Click to view details">
        <Card
          style={{
            cursor: "pointer",
            minWidth: 250,
          }}
          onClick={() => router.push(`accounts/${account.id}`)}
        >
          <CardHeader
            title={account.account_alias}
            subheader={account.account_number}
          />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {account.holder}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <AccountBalanceIndicator account={account} />
              <AccountBalanceMiniChart accountId={account.id} tooltipText="" />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={handleUpdateBalance}
            >
              Update Balance
            </Button>
          </CardActions>
        </Card>
      </Tooltip>
    </>
  );
}
