"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DeleteVehicleDialog from "./DeleteVehicleDialog";
import DeleteIcon from "@mui/icons-material/Delete";

import client from "@/api/apiClient";
import type { components } from "@/api/schema";

type Vehicle = components["schemas"]["Vehicle"];

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["vehicles", vehicle.id],
    queryFn: () =>
      client.GET("/vehicles/{vehicle_id}", {
        params: {
          path: { vehicle_id: vehicle.id },
        },
      }),
  });

  return (
    <>
      <DeleteVehicleDialog
        vehicle={vehicle}
        open={deleteDialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <Card>
        <CardHeader
          title={
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {vehicle.name}
              </Typography>
              {vehicle.type === "car" && (
                <Tooltip title={vehicle.type.toLocaleUpperCase()}>
                  <DirectionsCarIcon sx={{ fontSize: "large" }} />
                </Tooltip>
              )}
              {vehicle.type === "motorcycle" && (
                <Tooltip title={vehicle.type.toLocaleUpperCase()}>
                  <TwoWheelerIcon sx={{ fontSize: "large" }} />
                </Tooltip>
              )}
              {vehicle.type === "truck" && (
                <Tooltip title={vehicle.type.toLocaleUpperCase()}>
                  <Typography variant="body2">Truck</Typography>
                </Tooltip>
              )}
            </Box>
          }
          subheader={
            <Box display="flex" flexDirection="row">
              <Typography
                variant="body2"
                sx={{ flexGrow: 1 }}
                color={theme.palette.grey[600]}
              >
                {`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color={theme.palette.grey[600]}>
                  License Plate
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                  {vehicle.license_plate}
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color={theme.palette.grey[600]}>
                  Color
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "monospace", transform: "uppercase" }}
                >
                  {vehicle.color.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color={theme.palette.grey[600]}>
                  Odometer Stand
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                  {vehicle.odometer.toLocaleString()} km
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" flexDirection="row">
            <Box flexGrow={1}>
              <Button
                size="small"
                color="primary"
                LinkComponent={NextLink}
                href={`/vehicles/${vehicle.id}`}
              >
                View
              </Button>
            </Box>
            <IconButton color="error" onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
