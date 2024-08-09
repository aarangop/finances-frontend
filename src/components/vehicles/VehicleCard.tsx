"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

import client from "@/api/apiClient";
import type { components } from "@/api/schema";
import { QueryClient } from "@tanstack/react-query";

type Vehicle = components["schemas"]["Vehicle"];

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const theme = useTheme();

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
    <Card>
      <CardHeader
        title={vehicle.name}
        subheader={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
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
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                {vehicle.color}
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
        <Button
          size="small"
          color="primary"
          LinkComponent={NextLink}
          href={`/vehicles/${vehicle.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
