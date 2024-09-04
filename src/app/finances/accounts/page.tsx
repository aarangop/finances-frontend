"use client";

import AccountCard from "@/components/cards/AccountCard";
import Main from "@/components/layout/Main";
import { useGetAccounts } from "@/hooks/account";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AccountsPage() {
  const { data: accounts, isLoading, isError } = useGetAccounts();
  const router = useRouter();
  return (
    <Main>
      <Container>
        <Grid container spacing={2}>
          {accounts?.map((account) => (
            <Grid item xs={12} md={6} lg={4} key={account.id}>
              <AccountCard account={account} />
            </Grid>
          ))}
        </Grid>
        <Button
          endIcon={<AddIcon />}
          onClick={() => router.push("/finances/accounts/new")}
          sx={{ mt: "1rem" }}
        >
          New Account
        </Button>
      </Container>
    </Main>
  );
}
