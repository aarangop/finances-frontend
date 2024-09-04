import getClient from "@/api/apiClient";
import VehicleCardGrid from "@/components/io/VehicleCardGrid";
import Main from "@/components/layout/Main";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NextLink from "next/link";

export default function VehiclesPage() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: () => {
      const client = getClient();
      client.GET("/vehicles/");
    },
  });

  return (
    <Main>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          My Vehicles
        </Typography>
      </Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VehicleCardGrid />
      </HydrationBoundary>
      <Container>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          LinkComponent={NextLink}
          href="/vehicles/new"
          sx={{
            position: "absolute",
            bottom: "1rem",
          }}
        >
          New Vehicle
        </Button>
      </Container>
    </Main>
  );
}
