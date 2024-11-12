"use client";

import AccountDetailsCard from "@/components/cards/AccountDetailsCard";
import { useGetAccountById } from "@/hooks/account";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AccountDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { data: account, isLoading, isError } = useGetAccountById(params.id);
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !account) {
    return <div>Error loading account details</div>;
  }

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/finances/accounts")}
        sx={{ mb: "1rem" }}
      >
        Back
      </Button>
      <AccountDetailsCard account={account} />
    </Container>
  );
}
