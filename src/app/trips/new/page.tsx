"use client";

import client from "@/api/apiClient";
import { getQueryClient } from "@/api/queryClient";
import Main from "@/components/Main";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const steps = ["Trip Type", "Trip Data"];

export default function NewTripPage() {
  const [tripType, setTripType] = useState<string>("");
  const [nextStepDisabled, setNextStepDisabled] = useState(false);
  const queryClient = getQueryClient();
  const router = useRouter();

  queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: () => client.GET("/vehicles/"),
  });

  useEffect(() => {
    if (tripType === "") {
      setNextStepDisabled(true);
      return;
    }
    setNextStepDisabled(false);
  }, [tripType]);

  const handleNext = () => {
    router.push("/trips/car/new");
  };

  const handleCancel = () => {
    router.push("/trips");
  };

  const handleTripTypeChange = (event: SelectChangeEvent) => {
    setTripType(event.target.value);
  };

  return (
    <Main>
      <Container>
        <Typography variant="h6" sx={{ mb: "1rem" }} left={0}>
          New Trip
        </Typography>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Card sx={{ flexGrow: 1, width: "100%" }}>
              <CardContent>
                <FormControl fullWidth data-testid="trip-type-step-content">
                  <InputLabel id="trip-type-label">Trip Type</InputLabel>
                  <Select
                    labelId="trip-type-label"
                    id="trip-type-select"
                    label="Trip Type"
                    required
                    value={tripType ?? ""}
                    onChange={handleTripTypeChange}
                  >
                    <MenuItem value="car" data-testid="trip-type-car-option">
                      Car
                    </MenuItem>
                    <MenuItem
                      value="plane"
                      data-testid="trip-type-plane-option"
                      disabled
                    >
                      Plane
                    </MenuItem>
                    <MenuItem
                      value="bus"
                      data-testid="trip-type-bus-option"
                      disabled
                    >
                      bus
                    </MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions>
                <Box display="flex" width="100%" gap={2}>
                  <Button
                    onClick={handleNext}
                    disabled={nextStepDisabled}
                    variant="contained"
                  >
                    Enter Trip Details
                  </Button>
                  <Button onClick={handleCancel} color="error">
                    Cancel
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Main>
  );
}
