"use client";

import VehicleForm from "@/components/forms/VehicleForm";
import Main from "@/components/layout/Main";
import { useOpenApiClient } from "@/hooks/api";
import { useGetVehicle } from "@/hooks/vehicle";
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
import { useState } from "react";

export default function VehicleDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const client = useOpenApiClient();
  const { data: vehicle, status } = useGetVehicle(params.id);
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
            {vehicle && (
              <Grid item xs={12}>
                <VehicleForm vehicle={vehicle} />
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
