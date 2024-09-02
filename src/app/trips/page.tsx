"use client";

import client from "@/api/apiClient";
import { components } from "@/api/schema";
import Main from "@/components/Main";
import NewTripButton from "@/components/trips/NewTripButton";
import { DirectionsBike, DirectionsBoat } from "@mui/icons-material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import TrainIcon from "@mui/icons-material/Train";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Trip = components["schemas"]["TripSchema"];
type Expense = components["schemas"]["ExpenseSchema"];

export default function RoadtripsPage() {
  const {
    data: trips,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => client.GET("/trips/"),
  });

  const router = useRouter();

  const getNumberOfNights = (trip: Trip) => {
    const start = dayjs(trip.start_date);
    const end = dayjs(trip.end_date);
    return end.diff(start, "days");
  };

  const getTotalCosts = (trip: Trip) => {
    return trip.expenses.reduce(
      (acc: number, expense: Expense) => acc + expense.amount,
      0
    );
  };

  const getModeOfTransportIcon = (mode: string) => {
    switch (mode) {
      case "car":
        return <DirectionsCarIcon sx={{ height: "100%" }} fontSize="small" />;
      case "plane":
        return <FlightTakeoffIcon sx={{ height: "100%" }} fontSize="small" />;
      case "train":
        return <TrainIcon sx={{ height: "100%" }} fontSize="small" />;
      case "bus":
        return <DirectionsBusIcon sx={{ height: "100%" }} fontSize="small" />;
      case "boat":
        return <DirectionsBoat sx={{ height: "100%" }} fontSize="small" />;
      case "bike":
        return <DirectionsBike sx={{ height: "100%" }} fontSize="small" />;
    }
  };

  const handleDoubleClick = (trip: Trip) => {
    switch (trip.mode_of_transport) {
      case "car":
        router.push(`/trips/car/${trip.id}`);
        break;
    }
  };

  const columns: GridColDef<Trip>[] = [
    {
      field: "mode_of_transport",
      headerName: "Mode",
      width: 150,
      renderCell: (params) => getModeOfTransportIcon(params.value as string),
    },
    { field: "start_date", headerName: "Start", width: 150 },
    { field: "origin", headerName: "Origin", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    {
      field: "nights",
      headerName: "Nights",
      valueGetter: (_, row) => getNumberOfNights(row as Trip),
      width: 150,
    },
    { field: "distance", headerName: "Distance", width: 150 },
    {
      field: "total_costs",
      headerName: "Total Costs",
      width: 150,
      valueGetter: (_, row) => getTotalCosts(row as Trip),
    },
  ];
  return (
    <Main>
      <Container>
        <Card>
          <CardHeader title="My Trips" />
          <CardContent>
            {isPending && (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
                width="100%"
                mt={1}
              >
                <CircularProgress />
                <Typography>Loading...</Typography>
              </Box>
            )}
            {trips?.data && (
              <>
                <DataGrid
                  columns={columns}
                  rows={trips.data}
                  onRowDoubleClick={({ row }) => handleDoubleClick(row as Trip)}
                  sortModel={[{ field: "start_date", sort: "desc" }]}
                  pageSizeOptions={[
                    { label: "5", value: 5 },
                    { label: "10", value: 10 },
                    { label: "20", value: 20 },
                    { label: "100", value: 100 },
                  ]}
                />
              </>
            )}
          </CardContent>
          <CardActions>
            <NewTripButton />
          </CardActions>
        </Card>
      </Container>
    </Main>
  );
}
