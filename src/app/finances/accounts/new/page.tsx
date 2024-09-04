import AccountForm from "@/components/forms/AccountForm";
import Main from "@/components/layout/Main";
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
