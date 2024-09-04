import CarTripForm from "@/components/forms/CarTripForm";
import Main from "@/components/layout/Main";
import { Container } from "@mui/material";

export default function NewCarTripPage() {
  return (
    <Main>
      <Container>
        <CarTripForm trip={undefined} />
      </Container>
    </Main>
  );
}
