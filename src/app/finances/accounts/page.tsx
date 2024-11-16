"use client";

import AccountCard from "@/components/cards/AccountCard";
import Main from "@/components/layout/Main";
import { useGetAccounts } from "@/hooks/account";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AccountsPage() {
  const { data: accounts, isLoading, isError } = useGetAccounts();
  const router = useRouter();

  return (
    <Main>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            My Accounts
          </Typography>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => router.push("/finances/accounts/new")}
          >
            New Account
          </Button>
        </Box>

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            There was an error loading your accounts. Please try again later.
          </Alert>
        )}

        {isLoading ? (
          <Grid container spacing={2}>
            {[1, 2, 3].map((skeleton) => (
              <Grid item xs={12} md={6} lg={4} key={skeleton}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : accounts?.length === 0 ? (
          <Alert severity="info">
            You don&apos;t have any accounts yet. Click &quot;New Account&quot;
            to create one.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {accounts?.map((account) => (
              <Grid item xs={12} md={6} lg={4} key={account.id}>
                <AccountCard account={account} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Main>
  );
}
