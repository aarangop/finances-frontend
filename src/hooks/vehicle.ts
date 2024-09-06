import getClient from "@/api/apiClient";
import { getQueryClient } from "@/api/queryClient";
import { components } from "@/api/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

type VehicleCreate = components["schemas"]["VehicleCreateSchema"];
type Vehicle = components["schemas"]["VehicleSchema"];

interface UseGetVehicleProps {
  skip?: number;
  limit?: number | null;
}
export const useGetVehicles = () =>
  useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const client = getClient();
      try {
        const response = await client.GET("/vehicles/");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });

interface UseCreateVehicleProps {
  onSuccess?: (data: Vehicle, variables: VehicleCreate, context: any) => void;
  onError?: (error: Error, variables: VehicleCreate, context: any) => void;
}
export const useCreateVehicle = (props?: UseCreateVehicleProps) =>
  useMutation({
    mutationKey: ["vehicles", "create"],
    mutationFn: async (vehicle: VehicleCreate) => {
      const client = getClient();
      const queryClient = getQueryClient();
      try {
        const response = await client.POST("/vehicles/", { body: vehicle });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        return response.data as Vehicle;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  });

interface UseUpdateVehicleProps {
  onSuccess?: (data: Vehicle, variables: Vehicle, context: any) => void;
  onError?: (error: Error, variables: Vehicle, context: any) => void;
}

export const useUpdateVehicle = (props?: UseUpdateVehicleProps) =>
  useMutation({
    mutationKey: ["vehicles", "update"],
    mutationFn: async (vehicle: Vehicle) => {
      const client = getClient();
      const queryClient = getQueryClient();
      try {
        const response = await client.PUT("/vehicles/{vehicle_id}", {
          params: { path: { vehicle_id: vehicle.id } },
          body: vehicle,
        });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        return response.data as Vehicle;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  });
