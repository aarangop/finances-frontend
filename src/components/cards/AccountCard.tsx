"use client";

import { components } from "@/api/schema";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateAccountBalanceDialog from "../dialogs/UpdateAccountBalanceDialog";

type Account = components["schemas"]["AccountSchema"];

export default function AccountCard({ account }: { account: Account }) {
  const router = useRouter();

  const handleUpdateBalance = (event: React.MouseEvent) => {
    event.stopPropagation();
    setUpdateDialogOpen(true);
  };

  const handleDeleteAccount = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
  };
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  return (
    <>
      <UpdateAccountBalanceDialog
        account={account}
        open={updateDialogOpen}
        handleDialogClose={() => {
          setUpdateDialogOpen(false);
        }}
      />
      <Card
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`accounts/${account.id}`)}
      >
        <CardHeader
          title={account.account_alias}
          subheader={account.account_number}
        />
        <CardContent>
          <Typography variant="body1">{account.holder}</Typography>
          <Typography variant="body2">
            {account.currency} {account.balance}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" onClick={handleUpdateBalance}>
            Update Balance
          </Button>
          <Button
            size="small"
            color="error"
            onClick={(event) => handleDeleteAccount(event, account.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
