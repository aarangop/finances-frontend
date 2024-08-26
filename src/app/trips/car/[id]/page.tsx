"use client";
import client from "@/api/apiClient";
import Main from "@/components/Main";
import CarTripForm from "@/components/trips/car/CarTripForm";
import { CircularProgress, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function CarTripPage({ params }: { params: { id: number } }) {
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
