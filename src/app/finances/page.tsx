import Main from "@/components/layout/Main";
import { Link, Typography } from "@mui/material";

export default function FinancesPage() {
  return (
    <Main>
      <Typography variant="h3">Finances</Typography>
      <ul>
        <Link href="/finances/accounts">Transactions</Link>
        <Link href="/finances/expenses">Expenses</Link>
      </ul>
    </Main>
  );
}
