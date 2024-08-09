"use client";

import client from "@/api/apiClient";
import { getQueryClient } from "@/api/queryClient";
import { components } from "@/api/schema";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Vehicle = components["schemas"]["Vehicle"];

export default function VehicleForm({
  vehicle,
  newVehicle = false,
}: {
  vehicle: Vehicle;
  newVehicle?: boolean;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDialogClose = () => setDeleteDialogOpen(false);
  const router = useRouter();
  const vehicleTypes = ["car", "motorcycle", "truck"];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Vehicle>({
    defaultValues: vehicle,
  });
  const mutation = useMutation({
    mutationFn: (data: Vehicle) => {
      if (!newVehicle) {
        return client.PUT("/vehicles/{vehicle_id}", {
          params: { path: { vehicle_id: vehicle.id } },
          body: data,
        });
      } else {
        return client.POST("/vehicles/", {
          body: data,
        });
      }
    },
    mutationKey: ["vehicles", vehicle.id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      router.push("/vehicles");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data: Vehicle) => {
      return client.DELETE("/vehicles/{vehicle_id}", {
        params: { path: { vehicle_id: vehicle.id } },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      router.push("/vehicles");
    },
  });

  const deleteVehicle = () => {
    deleteMutation.mutate(vehicle);
    setDeleteDialogOpen(false);
  };

  const queryClient = getQueryClient();

  const onSubmit: SubmitHandler<Vehicle> = async (data, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    mutation.mutate(data);
  };

  return (
    <>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this vehicle?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={deleteVehicle}
            startIcon={<DeleteIcon />}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true, minLength: 2 }}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: "100%" }}
                      id="Name"
                      label="Name"
                      error={!!errors.name}
                      {...field}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="Brand"
                      label="Brand"
                      sx={{ width: "100%" }}
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="model"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="Model"
                      label="Model"
                      sx={{ width: "100%" }}
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="year"
                  control={control}
                  rules={{
                    required: true,
                    min: 1990,
                    max: new Date().getFullYear() + 1,
                  }}
                  render={({ field }) => (
                    <TextField
                      id="Year"
                      label="Year"
                      sx={{ width: "100%" }}
                      type="number"
                      error={!!errors.year}
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="license_plate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="license_plate"
                      label="License Plate"
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        sx: {
                          textTransform: "uppercase",
                          fontFamily: "monospace",
                        },
                      }}
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="color"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="color"
                      label="Color"
                      sx={{ width: "100%" }}
                      inputProps={{
                        sx: {
                          textTransform: "uppercase",
                        },
                      }}
                      required
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="vehicle-type-label"
                        id="type"
                        label="Vehicle Type"
                        {...field}
                      >
                        {vehicleTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type.replace(/^\w/, (c) => c.toUpperCase())}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="odometer"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <TextField
                      id="odometer"
                      label="Odometer Stand [km]"
                      type="number"
                      sx={{
                        width: "100%",
                      }}
                      inputProps={{
                        sx: {
                          fontFamily: "monospace",
                        },
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" startIcon={<SaveIcon />} type="submit">
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
              color="error"
            >
              Delete
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
}
