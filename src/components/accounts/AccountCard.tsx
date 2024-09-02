import { components } from "@/api/schema";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

type Account = components["schemas"]["AccountSchema"];

export default function AccountCard({ account }: { account: Account }) {
  return (
    <Card>
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
    </Card>
  );
}
