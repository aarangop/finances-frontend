"use client";
import client from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function CarTripPage({ params }: { params: { id: number } }) {
  const {
    data: trip,
    status,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["trips", params.id],
    queryFn: () =>
      client.GET("/trips/car/{trip_id}", {
        params: { path: { trip_id: params.id } },
      }),
  });

  return (
    <div>
      <h1>Car Trip</h1>
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error loading trip data</p>}
      {status === "success" && <p>{JSON.stringify(trip)}</p>}
    </div>
  );
}
