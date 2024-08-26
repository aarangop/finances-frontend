import Main from "@/components/Main";
import CarTripForm from "@/components/trips/car/CarTripForm";
import { Container } from "@mui/material";

export default function NewCarTripPage() {
  return (
    <Main>
      <Container>
        <CarTripForm trip={null} />
      </Container>
    </Main>
  );
}
