"use client";

import client from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () => client.GET("/vehicles/"),
  });
};
