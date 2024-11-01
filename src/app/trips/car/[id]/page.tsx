"use client";

import CarTripForm from "@/components/forms/CarTripForm";
import Main from "@/components/layout/Main";
import { useOpenApiClient } from "@/hooks/api";
import { CircularProgress, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function CarTripPage({ params }: { params: { id: number } }) {
  const client = useOpenApiClient();
  const {
    data: trip,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["trips", params.id],
    queryFn: () =>
      client.GET("/trips/car/{trip_id}", {
        params: { path: { trip_id: params.id } },
      }),
  });

  return (
    <Main>
      <Container>
        {isPending && <CircularProgress />}
        {isSuccess && trip?.data && <CarTripForm trip={trip?.data} />}
      </Container>
    </Main>
  );
}
