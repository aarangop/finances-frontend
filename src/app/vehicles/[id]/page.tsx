"use client";

import client from "@/api/apiClient";
import Main from "@/components/Main";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";

export default function VehicleDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const [editMode, setEditMode] = useState(false);

  const { data: vehicle, status } = useQuery({
    queryKey: ["vehicles", params.id],
    queryFn: () =>
      client.GET("/vehicles/{vehicle_id}", {
        params: {
          path: { vehicle_id: params.id },
        },
      }),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const yearRange = Array.from({ length: 20 }, (_, i) => 2022 - i);
  return (
    <Main>
      <Container>
        {status === "pending" && (
          <Typography variant="h6">Loading...</Typography>
        )}
        {status === "error" && (
          <Typography variant="h6">Error loading vehicle data</Typography>
        )}
        {status === "success" && (
          <>
            <Card>
              <CardHeader title={vehicle.data?.name} />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={12}>
                          <TextField
                            sx={{ width: "100%" }}
                            label="Name"
                            value={vehicle.data?.name}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            label="Brand"
                            sx={{ width: "100%" }}
                            value={vehicle.data?.brand}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            label="Model"
                            sx={{ width: "100%" }}
                            value={vehicle.data?.model}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            label="Year"
                            sx={{ width: "100%" }}
                            value={vehicle.data?.year}
                            type="number"
                          ></TextField>
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            label="Odometer Stand [km]"
                            value="95.000"
                            type="number"
                            InputProps={{ readOnly: !editMode }}
                            sx={{ fontFamily: "monospace", width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        label="Fuel Consumption [gl/100km]"
                        value="8.5"
                        type="number"
                        disabled
                        InputProps={{ readOnly: true }}
                        sx={{ fontFamily: "monospace", width: "100%" }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        label="Fuel Costs [COP/100km]"
                        value="50.000"
                        type="number"
                        disabled
                        InputProps={{ readOnly: true }}
                        sx={{ fontFamily: "monospace", width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <CardActions>
                <Button variant="contained" startIcon={<SaveIcon />}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </Container>
    </Main>
  );
}
