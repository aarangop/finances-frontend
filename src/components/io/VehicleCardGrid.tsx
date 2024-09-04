"use client";

import getClient from "@/api/apiClient";
import { Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import VehicleCard from "../cards/VehicleCard";

export default function VehicleCardGrid() {
  const client = useRef(getClient());
  const { data, status } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => client.current.GET("/vehicles/"),
  });

  return (
    <Container sx={{ display: "flex" }}>
      {status === "pending" && <Typography variant="h6">Loading...</Typography>}
      {status === "error" && (
        <Typography variant="h6" color="error">
          Error loading vehicles
        </Typography>
      )}
      {status === "success" && (
        <Grid container spacing={2} sx={{}}>
          {data.data?.map((vehicle) => (
            <Grid item key={vehicle.id} xs={2} sm={4} md={4}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}