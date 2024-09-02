import { default as getClient } from "@/api/apiClient";
import { components } from "@/api/schema";
import { useMutation } from "@tanstack/react-query";

type CarTrip = components["schemas"]["CarTripSchema-Output"];
type CarTripCreate = components["schemas"]["CarTripCreateSchema"];

interface CarTripMutationProps {
  onSuccessCallback: (
    data: CarTrip | undefined,
    variables: CarTrip | CarTripCreate,
    context: unknown
  ) => void;
  onErrorCallback: (error: Error) => void;
}

/**
 * Custom hook for creating a car trip.
 *
 * @param {CarTripMutationProps} options - The options for the car trip mutation.
 * @param {Function} options.onSuccessCallback - The callback function to be executed on successful mutation.
 * @param {Function} options.onErrorCallback - The callback function to be executed on error during mutation.
 *
 * @returns {MutationResult} - The result of the mutation.
 */
export const useCreateTrip = ({
  onSuccessCallback,
  onErrorCallback,
}: CarTripMutationProps) =>
  useMutation({
    mutationKey: ["trips", "car", "create"],
    mutationFn: async (trip: CarTripCreate) => {
      const client = getClient();
      const response = await client.POST("/trips/car", { body: trip });
      return response.data;
    },
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

/**
 * Custom hook for updating a car trip.
 *
 * @param {CarTripMutationProps} options - The options for the mutation.
 * @param {Function} options.onSuccessCallback - The callback function to be executed on successful mutation.
 * @param {Function} options.onErrorCallback - The callback function to be executed on error during mutation.
 *
 * @returns {MutationResult} - The result of the mutation.
 */
export const useUpdateTrip = ({
  onSuccessCallback,
  onErrorCallback,
}: CarTripMutationProps) =>
  useMutation({
    mutationKey: ["trips", "car", "update"],
    mutationFn: async (trip: CarTrip) => {
      const client = getClient();
      const response = await client.PUT("/trips/car/{trip_id}", {
        params: { path: { trip_id: trip.id } },
        body: trip,
      });
      return response.data;
    },
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });
