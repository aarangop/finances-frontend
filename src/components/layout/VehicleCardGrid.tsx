"use client";

import { components } from "@/api/schema";
import { Container, Grid, Typography } from "@mui/material";
import VehicleCard from "../cards/VehicleCard";
import VehicleCardSkeleton from "../cards/VehicleCardSkeleton";

type Vehicle = components["schemas"]["VehicleSchema"];

export interface VehicleCardGridProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  vehicles?: Vehicle[];
}
export default function VehicleCardGrid({
  isLoading,
  isError,
  isSuccess,
  vehicles = [],
}: VehicleCardGridProps) {
  return (
    <Container sx={{ display: "flex" }}>
      {isError && (
        <Typography variant="h6" color="error">
          Error loading vehicles
        </Typography>
      )}
      {!isError && (
        <Grid container spacing={2} sx={{}}>
          {isSuccess &&
            vehicles.map((vehicle) => (
              <Grid item key={vehicle.id} xs={2} sm={4} md={4}>
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
          {isLoading &&
            Array.from({ length: 2 }).map((_, index) => (
              <Grid item key={index} xs={2} sm={4} md={4}>
                <VehicleCardSkeleton />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
}
