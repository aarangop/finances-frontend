import client from "@/api/apiClient";
import { components } from "@/api/schema";
import Main from "@/components/Main";
import VehicleList from "@/components/vehicles/VehicleList";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import NextLink from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Vehicle = components["schemas"]["Vehicle"];

export default function VehiclesPage() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: () => client.GET("/vehicles/"),
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
        <VehicleList />
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
