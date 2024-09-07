"use client";

import Main from "@/components/layout/Main";
import VehicleCardGrid from "@/components/layout/VehicleCardGrid";
import { useGetVehicles } from "@/hooks/vehicle";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

export default function VehiclesPage() {
  const { isSuccess, isLoading, isError, data: vehicles } = useGetVehicles();

  return (
    <Main>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          My Vehicles
        </Typography>
      </Container>
      <VehicleCardGrid
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        vehicles={vehicles}
      />
      <Container>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          LinkComponent={NextLink}
          href="/vehicles/new"
          sx={{
            position: "absolute",
            bottom: "1rem",
          }}
        >
          New Vehicle
        </Button>
      </Container>
    </Main>
  );
}
