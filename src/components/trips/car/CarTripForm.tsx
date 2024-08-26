"use client";

import client from "@/api/apiClient";
import { components } from "@/api/schema";
import VehicleAutocomplete from "@/components/vehicles/VehicleAutocomplete";
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
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CarTrip = components["schemas"]["CarTripSchema-Output"];
type Vehicle = components["schemas"]["VehicleSchema"];

interface CarTripFormProps {
  trip?: CarTrip | null;
}

export default function CarTripForm({ trip }: CarTripFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CarTrip>({ defaultValues: trip ?? undefined });

  useEffect(() => {
    console.log(trip);
  }, [trip]);

  const createTripMutation = useMutation({
    mutationKey: ["trips", "car"],
    mutationFn: (trip: CarTrip) => client.POST("/trips/car", { body: trip }),
    onSuccess: (response) => {
      if (response.data?.id) {
        router.push(`/trips/car/${response.data?.id}`);
        return;
      }
    },
  });

  const updateTripMutation = useMutation({
    mutationKey: ["trips", "car"],
    mutationFn: (trip: CarTrip) => {
      console.log(trip.id);
      return client.PUT("/trips/car/{trip_id}", {
        params: { path: { trip_id: trip.id } },
        body: trip,
      });
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CarTrip> = (data: CarTrip) => {
    console.log(data);
    if (trip === null) {
      // Create new trip
      createTripMutation.mutate(data);
    } else {
      // Update existing trip
      updateTripMutation.mutate(data);
    }
  };

  const [startDate, odometerStart, odometerEnd, vehicle] = watch([
    "start_date",
    "odometer_start",
    "odometer_end",
    "vehicle",
  ]);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setValue("odometer_start", vehicle.odometer);
    setValue("odometer_end", vehicle.odometer + 100);
    handleOdometerChange();
  };

  const handleOdometerChange = () => {
    if (odometerStart && odometerEnd && odometerEnd >= odometerStart) {
      setValue("distance", odometerEnd - odometerStart);
    } else {
      setValue("distance", 0);
    }
  };

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
                  defaultValue={trip?.origin || ""}
                  rules={{
                    required: {
                      value: true,
                      message: "Origin is required",
                    },
                    minLength: {
                      value: 2,
                      message: "Origin must contain at least two characters",
                    },
                  }}
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
                  defaultValue={trip?.destination || ""}
                  rules={{
                    required: {
                      value: true,
                      message: "Destination is required",
                    },
                  }}
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
                    defaultValue={
                      trip?.start_date || dayjs().format("YYYY-MM-DD")
                    }
                    rules={{
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    }}
                    render={({ field }) => (
                      <DatePicker
                        sx={{ flexGrow: 1 }}
                        {...field}
                        value={field.value ? dayjs(field.value) : dayjs()}
                        onChange={(date) =>
                          field.onChange(date?.format("YYYY-MM-DD"))
                        }
                        label="Start *"
                      />
                    )}
                  />{" "}
                  <span>
                    <Typography variant="body1">-</Typography>
                  </span>
                  <Controller
                    control={control}
                    name="end_date"
                    defaultValue={trip?.end_date || ""}
                    rules={{
                      required: {
                        value: true,
                        message: "End date is required",
                      },
                      validate: (value) =>
                        startDate && value >= startDate
                          ? true
                          : "End date must be after start date",
                    }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ flexGrow: 1 }}
                        minDate={dayjs(startDate)}
                        disabled={!startDate && !trip?.start_date}
                        value={
                          field.value
                            ? dayjs(field.value)
                            : dayjs().add(2, "day")
                        }
                        onChange={(date) =>
                          field.onChange(date?.format("YYYY-MM-DD"))
                        }
                        label="End *"
                      />
                    )}
                  />{" "}
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
                rules={{
                  required: { value: true, message: "Please select a vehicle" },
                }}
                name="vehicle"
                render={({ field }) => (
                  <VehicleAutocomplete<CarTrip>
                    field={field}
                    onVehicleSelect={handleVehicleSelect}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="odometer_start"
                control={control}
                rules={{ required: true, min: 0 }}
                defaultValue={trip?.odometer_start || 0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleOdometerChange();
                    }}
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
                defaultValue={trip?.odometer_end || 0}
                rules={{
                  required: true,
                  min: 0,
                  validate: (value) =>
                    value >= odometerStart
                      ? true
                      : "End odometer must be greater than start odometer",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleOdometerChange();
                    }}
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
                  {odometerEnd - odometerStart} km
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Controller
                name="round_trip"
                control={control}
                defaultValue={trip?.round_trip ?? true}
                rules={{ required: true }}
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
          <Button type="submit" variant="contained">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
