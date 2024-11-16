"use client";

import { components } from "@/api/schema";
import {
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
import UpdateAccountBalanceDialog from "../dialogs/UpdateAccountBalanceDialog";

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
            <Typography variant="body1">{account.holder}</Typography>
            <Typography variant="body2">
              {account.currency} {formattedBalance}
            </Typography>
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
