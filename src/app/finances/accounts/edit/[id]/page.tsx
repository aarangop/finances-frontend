"use client";

import { components } from "@/api/schema";
import AccountForm from "@/components/forms/AccountForm";
import { useGetAccountById } from "@/hooks/account";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Alert, Box, Button, CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/navigation";

type Account = components["schemas"]["AccountSchema"];

export default function AccountEditPage({
  params,
}: {
  params: { id: number };
}) {
  const { data: account, isLoading, error } = useGetAccountById(params.id);
  const router = useRouter();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Failed to load account</Alert>
      </Container>
    );
  }

  if (!account) {
    return (
      <Container>
        <Alert severity="error">Account not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push(`/finances/accounts/${account.id}`)}
        sx={{ mb: "1rem" }}
      >
        Back
      </Button>
      <AccountForm account={account} />
    </Container>
  );
}
