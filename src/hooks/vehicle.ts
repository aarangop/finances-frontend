import { components } from "@/api/schema";
import { getQueryClient } from "@/utils/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi, useOpenApiClient } from "./api";

type VehicleCreate = components["schemas"]["VehicleCreateSchema"];
type Vehicle = components["schemas"]["VehicleSchema"];

export const useGetVehicles = () => {
  const client = useOpenApiClient();
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      try {
        const response = await client.GET("/vehicles/");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
interface UseCreateVehicleProps {
  onSuccess?: (data: Vehicle, variables: VehicleCreate, context: any) => void;
  onError?: (error: Error, variables: VehicleCreate, context: any) => void;
}
export const useCreateVehicle = (props?: UseCreateVehicleProps) => {
  const { openApiClient, queryClient } = useApi();
  return useMutation({
    mutationKey: ["vehicles", "create"],
    mutationFn: async (vehicle: VehicleCreate) => {
      try {
        const response = await openApiClient.POST("/vehicles/", {
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
};
interface UseUpdateVehicleProps {
  onSuccess?: (data: Vehicle, variables: Vehicle, context: any) => void;
  onError?: (error: Error, variables: Vehicle, context: any) => void;
}

export const useUpdateVehicle = (props?: UseUpdateVehicleProps) => {
  const client = useOpenApiClient();
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["vehicles", "update"],
    mutationFn: async (vehicle: Vehicle) => {
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
};
