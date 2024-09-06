"use client";

import { components } from "@/api/schema";
import VehicleAutocomplete from "@/components/autocomplete/VehicleAutocomplete";
import { useCreateCarTrip, useUpdateTrip } from "@/hooks/carTrip";
import { useCarTripForm } from "@/hooks/useCarTripForm";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CarTrip = components["schemas"]["CarTripSchema-Output"];

interface CarTripFormProps {
  trip?: CarTrip | undefined | null;
}

/**
 * Renders a form for creating or editing a car trip.
 *
 * @param trip - The car trip object to edit, or null if creating a new trip.
 */
export default function CarTripForm({ trip }: CarTripFormProps) {
  const defaultValues: CarTrip = (trip as CarTrip) ?? {
    origin: "",
    destination: "",
    start_date: trip?.start_date ? dayjs(trip.start_date) : "",
    end_date: trip?.end_date ? dayjs(trip.end_date) : "",
    mode_of_transport: "car",
    round_trip: true,
    international: false,
    distance: undefined,
    expenses: [],
    odometer_start: "",
    odometer_end: "",
    vehicle: undefined,
  };

  const validationRules = {
    origin: {
      required: {
        value: true,
        message: "Origin is required",
      },
      minLength: {
        value: 2,
        message: "Origin must contain at least two characters",
      },
    },
    destination: {
      required: {
        value: true,
        message: "Destination is required",
      },
    },
    startDate: {
      required: { value: true, message: "Start date is required" },
      validate: (value: string) => value !== null || "Start date is required",
    },
    end_date: {
      required: {
        value: true,
        message: "End date is required",
      },
      validate: (value: string) =>
        startDate && value >= startDate
          ? true
          : "End date must be after start date",
    },
    vehicle: {
      required: { value: true, message: "Please select a vehicle" },
    },
    odometer_start: { required: true, min: 0 },
    odometer_end: {
      required: {
        value: true,
        message: "Origin is required",
      },
      minLength: {
        value: 2,
        message: "Origin must contain at least two characters",
      },
    },
    round_trip: { required: true },
    international: { required: true },
  };

  const [saveDisabled, isSaveDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid: formIsValid },
  } = useForm<CarTrip>({ defaultValues, mode: "onBlur" });

  useEffect(() => {
    isSaveDisabled(!formIsValid);
  }, [formIsValid]);

  const router = useRouter();

  const onCreateSuccess = useCallback((trip: CarTrip | undefined) => {
    if (!trip) {
      enqueueSnackbar("Failed to retrieve trip data from server", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    enqueueSnackbar("Trip created successfully", {
      variant: "success",
      autoHideDuration: 1500,
    });

    setTimeout(() => {
      router.push(`/trips/car/${trip.id}`);
    }, 2000);
  }, []);

  const onCreateError = useCallback((error: Error) => {
    enqueueSnackbar("Failed to create trip", {
      variant: "error",
      autoHideDuration: 1500,
    });
  }, []);

  const onUpdateSuccess = useCallback(() => {
    enqueueSnackbar("Trip updated successfully", {
      variant: "success",
      autoHideDuration: 1500,
    });
  }, []);

  const onUpdateError = useCallback((error: Error) => {
    enqueueSnackbar("Failed to update trip", {
      variant: "error",
      autoHideDuration: 1500,
    });
  }, []);

  const createTripMutation = useCreateCarTrip({
    onSuccessCallback: onCreateSuccess,
    onErrorCallback: onCreateError,
  });

  const updateTripMutation = useUpdateTrip({
    onSuccessCallback: onUpdateSuccess,
    onErrorCallback: onUpdateError,
  });

  const onSubmit: SubmitHandler<CarTrip> = (data: CarTrip) => {
    if (trip) {
      createTripMutation.mutate(data);
    } else {
      updateTripMutation.mutate(data);
    }
  };

  const [startDate, odometerStart, odometerEnd] = watch([
    "start_date",
    "odometer_start",
    "odometer_end",
    "vehicle",
  ]);

  const { handleVehicleSelect, handleOdometerChange } = useCarTripForm({
    setValue,
    watch,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card>
        <CardHeader
          title={
            trip
              ? `Edit car trip from ${trip.origin} to ${trip.destination}`
              : "New Car Trip"
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  rules={validationRules.origin}
                  name="origin"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      label="Origin"
                      error={!!errors.origin}
                      helperText={errors.origin?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  rules={validationRules.destination}
                  name="destination"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Destination"
                      required
                      error={!!errors.destination}
                      helperText={errors.destination?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  gap={1}
                  alignItems="center"
                >
                  <Controller
                    control={control}
                    name="start_date"
                    defaultValue={defaultValues.start_date}
                    rules={validationRules.startDate}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ flexGrow: 1 }}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date?.format("YYYY-MM-DD"))
                        }
                        label="Start *"
                      />
                    )}
                  />
                  <span>
                    <Typography variant="body1">-</Typography>
                  </span>
                  <Controller
                    control={control}
                    name="end_date"
                    defaultValue={defaultValues.end_date}
                    rules={validationRules.end_date}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ flexGrow: 1 }}
                        minDate={dayjs(startDate)}
                        disabled={!startDate && !trip?.start_date}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date?.format("YYYY-MM-DD"))
                        }
                        label="End *"
                      />
                    )}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                  gap={1}
                >
                  <ErrorMessage
                    errors={errors}
                    name="start_date"
                    render={({ message }) => (
                      <Typography
                        variant="body2"
                        color="error"
                        fontSize={12}
                        sx={{ ml: "1rem", mt: "0.25rem" }}
                      >
                        {message}
                      </Typography>
                    )}
                  />
                  <Typography sx={{ visibility: "hidden" }}>-</Typography>
                  <ErrorMessage
                    errors={errors}
                    name="end_date"
                    render={({ message }) => (
                      <Typography
                        variant="body2"
                        color="error"
                        fontSize={12}
                        sx={{ mr: "1rem", mt: "0.25rem" }}
                      >
                        {message}
                      </Typography>
                    )}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                defaultValue={trip?.vehicle || undefined}
                rules={validationRules.vehicle}
                name="vehicle"
                render={({ field }) => (
                  <VehicleAutocomplete<CarTrip>
                    field={field}
                    required={true}
                    onVehicleSelect={handleVehicleSelect}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="odometer_start"
                control={control}
                rules={validationRules.odometer_start}
                defaultValue={
                  trip?.odometer_start || defaultValues.odometer_start
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    // onChange={(e) => {
                    //   field.onChange(e.target.value);
                    //   handleOdometerChange();
                    // }}
                    value={field.value}
                    fullWidth
                    label="Odometer Start *"
                    type="number"
                    error={Boolean(errors.odometer_start)}
                    helperText={errors.odometer_start?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="odometer_end"
                control={control}
                defaultValue={trip?.odometer_end || defaultValues.odometer_end}
                rules={validationRules.odometer_end}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Odometer End *"
                    type="number"
                    helperText={errors.odometer_end?.message}
                    error={!!errors.odometer_end}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              visibility={
                (odometerStart || trip?.odometer_start) &&
                odometerEnd &&
                trip?.odometer_end
                  ? "visible"
                  : "hidden"
              }
            >
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography variant="body1" sx={{ mr: "1rem" }}>
                  Distance Traveled:
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {odometerEnd && odometerStart
                    ? odometerEnd - odometerStart
                    : 0}{" "}
                  km
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Controller
                name="round_trip"
                control={control}
                rules={validationRules.round_trip}
                defaultValue={trip?.round_trip ?? true}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Round Trip"
                    checked={field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controller
                name="international"
                control={control}
                defaultValue={trip?.international ?? false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="International"
                    checked={field.value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" disabled={saveDisabled}>
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
