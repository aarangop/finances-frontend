"use client";

import client from "@/api/apiClient";
import Main from "@/components/Main";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function VehicleDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { data: vehicle, status } = useQuery({
    queryKey: ["vehicles", params.id],
    queryFn: () =>
      client.GET("/vehicles/{vehicle_id}", {
        params: {
          path: { vehicle_id: params.id },
        },
      }),
  });
  const [showFuelConsumption, setShowFuelConsumption] = useState(false);

  return (
    <Main>
      <Container>
        <Typography variant="h6" sx={{ mb: "1rem" }}>
          Car Details
        </Typography>
      </Container>
      <Container>
        {status === "pending" && (
          <Typography variant="h6">Loading...</Typography>
        )}
        {status === "error" && (
          <Typography variant="h6">Error loading vehicle data</Typography>
        )}
        {status === "success" && (
          <Grid container gap={2}>
            {vehicle.data && (
              <Grid item xs={12}>
                <VehicleForm vehicle={vehicle.data} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Button
              endIcon={
                showFuelConsumption ? (
                  <ExpandLessRounded />
                ) : (
                  <ExpandMoreRounded />
                )
              }
              fullWidth
              onClick={() => {
                setShowFuelConsumption(!showFuelConsumption);
              }}
            >
              Performance Overview
            </Button>
            <Grid item xs={12}>
              <Collapse
                in={showFuelConsumption}
                component="div"
                children={
                  <Card variant="elevation" sx={{ width: "100%" }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <TextField
                            label="Fuel Consumption [gl/100km]"
                            value="8.5"
                            type="number"
                            disabled
                            InputProps={{
                              readOnly: true,
                              sx: { fontFamily: "monospace" },
                            }}
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            label="Fuel Costs [COP/100km]"
                            value="50.000"
                            type="number"
                            disabled
                            InputProps={{
                              readOnly: true,
                              sx: { fontFamily: "monospace" },
                            }}
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                }
              ></Collapse>
            </Grid>
          </Grid>
        )}
      </Container>
    </Main>
  );
}
