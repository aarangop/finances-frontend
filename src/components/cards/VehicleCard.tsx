"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { QueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import DeleteVehicleDialog from "../dialogs/DeleteVehicleDialog";

import getClient from "@/api/apiClient";
import type { components } from "@/api/schema";

type Vehicle = components["schemas"]["VehicleSchema"];

/**
 * VehicleCard component displays information about a vehicle.
 *
 * @param {Object} props - The component props.
 * @param {Vehicle} props.vehicle - The vehicle object to display.
 * @returns {JSX.Element} The rendered VehicleCard component.
 */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const theme = useTheme();
  const client = useRef(getClient());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["vehicles", vehicle.id],
    queryFn: () =>
      client.current.GET("/vehicles/{vehicle_id}", {
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
              {vehicle.vehicle_type.toLowerCase() === "car" && (
                <Tooltip title={vehicle.vehicle_type.toLocaleUpperCase()}>
                  <DirectionsCarIcon sx={{ fontSize: "large" }} />
                </Tooltip>
              )}
              {vehicle.vehicle_type.toLowerCase() === "motorcycle" && (
                <Tooltip title={vehicle.vehicle_type.toLocaleUpperCase()}>
                  <TwoWheelerIcon sx={{ fontSize: "large" }} />
                </Tooltip>
              )}
              {vehicle.vehicle_type.toLowerCase() === "truck" && (
                <Tooltip title={vehicle.vehicle_type.toLocaleUpperCase()}>
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
                {`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
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
                <Box display="flex" flexDirection="row">
                  <Chip
                    label={vehicle.color?.toUpperCase()}
                    size="small"
                    variant={vehicle.color ? "filled" : "outlined"}
                    sx={{ fontFamily: "monospace", transform: "uppercase" }}
                  />
                </Box>
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
