import { components } from "@/api/schema";
import { getQueryClient } from "@/utils/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi, useOpenApiClient } from "./api";

type VehicleCreate = components["schemas"]["VehicleCreateSchema"];
type Vehicle = components["schemas"]["VehicleSchema"];

/**
 * Custom hook to fetch vehicles data.
 *
 * @returns {QueryResult} The result of the query.
 */
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

export const useGetVehicle = (vehicleId: number) => {
  const client = useOpenApiClient();
  return useQuery({
    queryKey: ["vehicles", vehicleId],
    queryFn: async () => {
      try {
        const response = await client.GET("/vehicles/{vehicle_id}", {
          params: { path: { vehicle_id: vehicleId } },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

/**
 * UseCreateVehicleProps interface represents the props for the useCreateVehicle hook.
 *
 * @property onSuccess - A callback function that will be called when the vehicle creation is successful.
 * @property onError - A callback function that will be called when an error occurs during vehicle creation.
 */
interface UseCreateVehicleProps {
  onSuccess?: (data: Vehicle, variables: VehicleCreate, context: any) => void;
  onError?: (error: Error, variables: VehicleCreate, context: any) => void;
}

/**
 * Custom hook for creating a vehicle.
 *
 * @param props - Optional props for the hook.
 * @returns The mutation result for creating a vehicle.
 */
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

/**
 * Represents the options for the `useUpdateVehicle` hook.
 *
 * @interface UseUpdateVehicleProps
 * @template Vehicle - The type of the vehicle object.
 * @param onSuccess - A callback function that will be called when the update operation is successful.
 * @param onError - A callback function that will be called when an error occurs during the update operation.
 */
interface UseUpdateVehicleProps {
  onSuccess?: (data: Vehicle, variables: Vehicle, context: any) => void;
  onError?: (error: Error, variables: Vehicle, context: any) => void;
}

/**
 * Custom hook for updating a vehicle.
 *
 * @param props - Optional props for the hook.
 * @returns The mutation function for updating a vehicle.
 */
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
