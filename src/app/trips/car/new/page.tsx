import Main from "@/components/Main";
import CarTripForm from "@/components/trips/car/CarTripForm";
import { Container, Typography } from "@mui/material";

export default function NewCarTripPage() {
  return (
    <Main>
      <Container>
        <Typography variant="h6" sx={{ mb: "1rem" }}>
          New Car Trip
        </Typography>
        <CarTripForm />
      </Container>
    </Main>
  );
}
