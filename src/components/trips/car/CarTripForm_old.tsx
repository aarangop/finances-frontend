"use client";

import client from "@/api/apiClient";
import { components } from "@/api/schema";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CarTrip = components["schemas"]["CarTripSchema-Input"];

export default function CarTripForm({
  enableDelete = false,
  trip,
}: {
  trip?: CarTrip | null;
  enableDelete?: boolean;
}) {
  // React-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CarTrip>();

  const router = useRouter();

  const [odometerStart, odometerEnd, startDate] = watch([
    "odometer_start",
    "odometer_end",
    "start_date",
  ]);

  const newTripMutation = useMutation({
    mutationFn: (data: CarTrip) => client.POST("/trips/car", { body: data }),
    mutationKey: ["trips", "car"],
    onSuccess: (_, variables, __) => {
      router.push(`/trips/car/${variables.id}`);
    },
  });

  const onSubmit: SubmitHandler<CarTrip> = (data: CarTrip, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    newTripMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="origin"
                  defaultValue={""}
                  control={control}
                  rules={{
                    required: { value: true, message: "Origin is required" },
                    minLength: {
                      value: 2,
                      message:
                        "Origin location must contain at least two characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Origin"
                      {...field}
                      error={Boolean(errors.origin)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                  name="origin"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="destination"
                  defaultValue={""}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Destination is required",
                    },
                    minLength: {
                      value: 2,
                      message:
                        "Destination must contain at least two characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Destination"
                      {...field}
                      error={Boolean(errors.destination)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="destination"
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="start_date"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Start date is required",
                    },
                  }}
                  render={({ field }) => (
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value ? dayjs(field.value) : dayjs()}
                      onChange={(date) => field.onChange(date)}
                      label="Start Date"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="start_date"
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="end_date"
                  control={control}
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
                      sx={{ width: "100%" }}
                      label="End Date"
                      disabled={startDate === undefined}
                      minDate={startDate}
                      {...field}
                      value={
                        field.value ? dayjs(field.value) : dayjs().add(2, "day")
                      }
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="end_date"
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Controller
                  name="vehicle"
                  control={control}
                  rules={{
                    required: { value: true, message: "Vehicle is required" },
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={vehicles?.data || []}
                      loading={isPending}
                      getOptionLabel={(option) =>
                        `${option.name} - ${option.make} ${option.model} ${option.year}`
                      }
                      renderOption={(props, option) => {
                        const { key, ...rest } = props;
                        return (
                          <Box component="li" key={key} {...rest}>
                            <Typography>{`${option.name} - ${option.make} ${option.model} ${option.year}`}</Typography>
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth label="Vehicle" />
                      )}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                  name="vehicle"
                />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="distance"
                  control={control}
                  rules={{ required: false, min: 0 }}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Approx. Loxodrome Distance"
                      type="number"
                      error={Boolean(errors.distance)}
                      {...field}
                    ></TextField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                  name="distance"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="odometer_start"
                  control={control}
                  rules={{ required: true, min: 0 }}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Odometer Start"
                      type="number"
                      error={Boolean(errors.odometer_start)}
                      {...field}
                    ></TextField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                  name="odometer_start"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="odometer_end"
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: true,
                    min: 0,
                    validate: (value) => value >= odometerStart,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Odometer End"
                      type="number"
                      error={Boolean(errors.odometer_end)}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="odometer_end"
                  render={({ message }) => (
                    <Typography color="error">{message}</Typography>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                visibility={odometerStart && odometerEnd ? "visible" : "hidden"}
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="round_trip"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={true}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="Round Trip"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="international"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="International"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button>Cancel</Button>
            {trip !== null && enableDelete && (
              <Button variant="outlined">Delete</Button>
            )}
          </CardActions>
        </Card>
      </form>
    </>
  );
}
