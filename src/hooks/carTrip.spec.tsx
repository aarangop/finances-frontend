import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import getOpenApiClient from "@/utils/openApiClient";
import { renderHook } from "@/utils/testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { act } from "react";
import { useCreateCarTrip, useUpdateTrip } from "./carTrip";

type Vehicle = components["schemas"]["VehicleSchema"];
type CarTripCreate = components["schemas"]["CarTripCreateSchema"];
type CarTrip = components["schemas"]["CarTripSchema-Output"];

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

const tripInput: CarTripCreate = {
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

const tripOutput: CarTrip = {
  ...tripInput,
  id: 1,
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
const client = getOpenApiClient();

describe("useCreateTrip", () => {
  beforeEach(() => {
    server.use(
      http.post(apiPath("/trips/car"), async ({ request, params }) => {
        const carTrip = (await request.json()) as CarTripCreate;
        return HttpResponse.json<CarTrip>({ ...carTrip, id: 1 });
      })
    );
  });

  it("should call the create trip API and return the response data", async () => {
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    // (client.POST as jest.Mock).mockResolvedValueOnce({ data: tripOutput });

    const { result } = renderHook(
      () => useCreateCarTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );
    const tripData: CarTripCreate = {
      ...tripInput,
      origin: "Cali",
      destination: "Cartagena",
    };
    const expectedTripData: CarTrip = {
      ...tripData,
      id: 1,
    };
    await result.current.mutateAsync(tripData);

    // Ensure the onSuccess callback was called with the correct data
    expect(onSuccessCallback).toHaveBeenCalledWith(
      expectedTripData,
      tripData,
      undefined
    );
    // Ensure the onError callback was not called
    expect(onErrorCallback).not.toHaveBeenCalled();
  });

  it("should call the error callback when the create trip API throws an error", async () => {
    // Arrange
    // Mock error response from server
    server.use(
      http.post(apiPath("/trips/car"), async () => {
        throw HttpResponse.error();
      })
    );
    // Mock callbacks
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    // Render hook
    const { result } = renderHook(
      () => useCreateCarTrip({ onSuccessCallback, onErrorCallback }),
      { wrapper }
    );

    // Act: Try to create a trip and expect it to fail
    await expect(() => result.current.mutateAsync(tripInput)).rejects.toThrow();

    // Assert
    expect(onSuccessCallback).not.toHaveBeenCalled();
    expect(onErrorCallback).toHaveBeenCalledWith(
      expect.any(Error),
      tripInput,
      undefined
    );
  });
});

describe("useUpdateTrip", () => {
  beforeAll(() => {
    server.use(
      http.put(apiPath("/trips/car/:trip_id"), async ({ request, params }) => {
        const carTripId = Number(params.trip_id);
        const carTrip = (await request.json()) as CarTrip;
        return HttpResponse.json<CarTrip>({ ...carTrip, id: carTripId });
      })
    );
  });

  it("should return the response data", async () => {
    const { result } = renderHook(() => useUpdateTrip(), { wrapper });
    const tripData = {
      ...tripOutput,
      id: 1,
      origin: "Cali",
      destination: "Barrancabermeja",
    };

    // Perform the mutation and wait for the response
    let mutationResult;
    await act(async () => {
      mutationResult = await result.current.mutateAsync(tripData); // capture the mutation result
    });

    expect(mutationResult).toEqual(tripData);
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
