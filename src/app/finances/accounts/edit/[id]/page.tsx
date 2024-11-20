"use client";

import AccountForm from "@/components/forms/AccountForm";
import { useGetAccountById } from "@/hooks/account";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Alert, Box, Button, CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/navigation";

/**
 * AccountEditPage component is responsible for rendering the account edit page.
 * It fetches the account data based on the provided account ID from the URL parameters.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The URL parameters.
 * @param {number} props.params.id - The ID of the account to be edited.
 *
 * @returns {JSX.Element} The rendered account edit page.
 *
 * The component handles the following states:
 * - Loading: Displays a loading spinner while the account data is being fetched.
 * - Error: Displays an error message if there is an issue fetching the account data.
 * - Not Found: Displays an error message if the account data is not found.
 * - Success: Displays the account edit form if the account data is successfully fetched.
 */
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
