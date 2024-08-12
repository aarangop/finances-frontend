import { components } from "@/api/schema";
import Main from "@/components/Main";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { Container, Typography } from "@mui/material";

type Vehicle = components["schemas"]["VehicleSchema"];
export default function NewVehiclePage() {
  const vehicle: Vehicle = {
    id: 0,
    name: "",
    make: "",
    model: "",
    year: 0,
    license_plate: "",
    odometer: 0,
    color: "",
    vehicle_type: "car",
  };

  return (
    <Main>
      <Container>
        <Typography variant="h6" sx={{ mb: "1rem" }}>
          New Vehicle
        </Typography>
      </Container>
      <Container>
        <VehicleForm vehicle={vehicle} newVehicle={true} />
      </Container>
    </Main>
  );
}
