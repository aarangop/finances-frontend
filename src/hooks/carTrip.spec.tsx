import getClient from "@/api/apiClient";
import { components } from "@/api/schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useCreateTrip, useUpdateTrip } from "./carTrip";

jest.mock("@/api/apiClient", () => ({
  POST: jest.fn(),
  PUT: jest.fn(),
}));

type Vehicle = components["schemas"]["VehicleSchema"];

const vehicle: Vehicle = {
  id: 1,
  name: "Car 1",
  make: "Toyota",
  model: "Corolla",
  year: 2020,
  odometer: 0,
  license_plate: "",
  vehicle_type: "car",
};

const tripInput: components["schemas"]["CarTripCreateSchema"] = {
  origin: "Medellin",
  destination: "Bogota",
  start_date: "2024/08/22",
  end_date: "2024/09/01",
  mode_of_transport: "car",
  round_trip: false,
  international: false,
  distance: null,
  expenses: [],
  odometer_start: 101091,
  odometer_end: 102091,
  vehicle: vehicle,
};

const tripOutput: components["schemas"]["CarTripSchema-Output"] = {
  ...tripInput,
  id: 1,
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const client = getClient();
describe("useCreateTrip", () => {
  beforeEach(() => {});
  it("should call the create trip API and return the response data", async () => {
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    (client.POST as jest.Mock).mockResolvedValueOnce({ data: tripOutput });

    const { result } = renderHook(
      () => useCreateTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );

    await result.current.mutateAsync(tripInput);

    // Verify the POST request was made with the correct arguments
    expect(client.POST).toHaveBeenCalledWith("/trips/car", { body: tripInput });
    // Ensure the onSuccess callback was called with the correct data
    expect(onSuccessCallback).toHaveBeenCalledWith(
      tripOutput,
      tripInput,
      undefined
    );
    // Ensure the onError callback was not called
    expect(onErrorCallback).not.toHaveBeenCalled();
  });

  it("should call the error callback when the create trip API throws an error", async () => {
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    const mockError = new Error("API error");

    (client.POST as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () => useCreateTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );

    await expect(() => result.current.mutateAsync(tripInput)).rejects.toThrow(
      mockError
    );
    expect(client.POST).toHaveBeenCalledWith("/trips/car", { body: tripInput });
    expect(onSuccessCallback).not.toHaveBeenCalled();
    expect(onErrorCallback).toHaveBeenCalledWith(
      mockError,
      tripInput,
      undefined
    );
  });
});

describe("useUpdateTrip", () => {
  it("should call the update trip API and return the response data", async () => {
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    (client.PUT as jest.Mock).mockResolvedValueOnce({ data: tripOutput });

    const { result } = renderHook(
      () => useUpdateTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );

    await result.current.mutateAsync(tripOutput);

    expect(client.PUT).toHaveBeenCalledWith("/trips/car/{trip_id}", {
      params: { path: { trip_id: tripOutput.id } },
      body: tripOutput,
    });
    expect(onSuccessCallback).toHaveBeenCalledWith(
      tripOutput,
      tripOutput,
      undefined
    );
    expect(onErrorCallback).not.toHaveBeenCalled();
  });

  it("should call the error callback when the update trip API throws an error", async () => {
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    const mockError = new Error("API error");

    (client.PUT as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () => useUpdateTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );

    await expect(result.current.mutateAsync(tripOutput)).rejects.toThrow(
      mockError
    );
    expect(onSuccessCallback).not.toHaveBeenCalled();
    expect(onErrorCallback).toHaveBeenCalledWith(
      mockError,
      tripOutput,
      undefined
    );
  });
});
