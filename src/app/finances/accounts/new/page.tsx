import AccountForm from "@/components/accounts/AccountForm";
import Main from "@/components/Main";
import { Container } from "@mui/material";

export default function NewAccountPage() {
  return (
    <Main>
      <Container>
        <AccountForm account={null} />
      </Container>
    </Main>
  );
}
