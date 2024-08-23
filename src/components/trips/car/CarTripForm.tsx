"use client";

import { components } from "@/api/schema";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CarTrip = components["schemas"]["CarTripSchema-Input"];

interface CarTripFormProps {
  trip?: CarTrip | null;
}
export default function CarTripForm({ trip }: CarTripFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CarTrip>();
  const onSubmit: SubmitHandler<CarTrip> = (data: CarTrip) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Typography variant="h6" mb="1rem">
            Car Trip
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  defaultValue={""}
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
                  defaultValue={""}
                  name="destination"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Destination"
                      error={!!errors.destination}
                      helperText={errors.origin?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  render={({ field }) => (
                    <DatePicker sx={{ flexGrow: 1 }} {...field} label="Start" />
                  )}
                />{" "}
                <span>
                  <Typography variant="body1">-</Typography>
                </span>
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field }) => (
                    <DatePicker sx={{ flexGrow: 1 }} {...field} label="End" />
                  )}
                />{" "}
              </Box>
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
