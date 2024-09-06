"use client";

import { components } from "@/api/schema";
import { useCreateVehicle, useUpdateVehicle } from "@/hooks/vehicle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DeleteVehicleDialog from "../dialogs/DeleteVehicleDialog";

type Vehicle = components["schemas"]["VehicleSchema"];

interface VehicleFormProps {
  vehicle: Vehicle;
  newVehicle?: boolean;
  onSuccess?: (vehicle: Vehicle) => void;
}
export default function VehicleForm({
  vehicle,
  newVehicle = false,
  onSuccess = () => {},
}: VehicleFormProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDialogClose = () => setDeleteDialogOpen(false);
  const vehicleTypes = ["car", "motorcycle", "truck"];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Vehicle>({
    defaultValues: vehicle,
  });

  const {
    data: createVehicleData,
    isPending: createVehicleIsPending,
    isSuccess: createVehicleIsSuccess,
    isError: createVehicleIsError,
    mutateAsync: createVehicleAsync,
  } = useCreateVehicle({});

  const {
    data: updateVehicleData,
    isPending: updateVehicleIsPending,
    isSuccess: updateVehicleIsSuccess,
    isError: updateVehicleIsError,
    mutateAsync: updateVehicleAsync,
  } = useUpdateVehicle({});

  useEffect(() => {
    if (createVehicleIsSuccess) {
      enqueueSnackbar("Vehicle created successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  }, [createVehicleIsSuccess]);

  useEffect(() => {
    if (updateVehicleIsSuccess) {
      enqueueSnackbar("Vehicle updated successfully", {
        variant: "info",
        autoHideDuration: 3000,
      });
    }
  }, [updateVehicleIsSuccess]);

  const onSubmit: SubmitHandler<Vehicle> = async (data, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (newVehicle) {
      await createVehicleAsync(data);
    } else {
      await updateVehicleAsync(data);
    }
  };

  return (
    <>
      <DeleteVehicleDialog
        vehicle={vehicle}
        open={deleteDialogOpen}
        handleDialogClose={handleDialogClose}
      ></DeleteVehicleDialog>
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
                  name="make"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="Make"
                      label="Make"
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
                    name="vehicle_type"
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
