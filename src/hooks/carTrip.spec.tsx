import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { renderHook } from "@/utils/testing";
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

const newTrip: CarTripCreate = {
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

const existingTrip: CarTrip = {
  ...newTrip,
  id: 1,
};

describe("useCreateTrip", () => {
  beforeEach(() => {
    server.use(
      http.post(apiPath("/trips/car"), async ({ request, params }) => {
        const carTrip = (await request.json()) as CarTripCreate;
        return HttpResponse.json<CarTrip>({ ...carTrip, id: 1 });
      })
    );
  });

  it("should return the response data", async () => {
    const { result } = renderHook(() => useCreateCarTrip());
    const tripData: CarTripCreate = {
      ...newTrip,
      origin: "Cali",
      destination: "Cartagena",
    };
    const expectedTripData: CarTrip = {
      ...tripData,
      id: 1,
    };
    const receivedData = await result.current.mutateAsync(tripData);
    expect(receivedData).toEqual(expectedTripData);
  });

  it("should call the success callback when the create trip mutation is successful", async () => {
    // Arrange
    const onSuccessCallback = jest.fn();
    const { result } = renderHook(() =>
      useCreateCarTrip({ onSuccessCallback })
    );

    // Act: Perform the mutation
    await result.current.mutateAsync(newTrip);

    // Assert
    expect(onSuccessCallback).toHaveBeenCalledWith(
      existingTrip,
      newTrip,
      undefined
    );
  });
  it("should not call the error callback when the create trip mutation is successful", async () => {
    // Arrange
    const onErrorCallback = jest.fn();
    const { result } = renderHook(() => useCreateCarTrip({ onErrorCallback }));

    // Act: Perform the mutation
    await result.current.mutateAsync(newTrip);

    // Assert
    expect(onErrorCallback).not.toHaveBeenCalled();
  });
  it("should call the error callback when the create trip mutation throws an error", async () => {
    // Arrange
    // Mock error response from server
    server.use(
      http.post(apiPath("/trips/car"), async () => {
        throw HttpResponse.error();
      })
    );
    const onErrorCallback = jest.fn();
    // Render hook
    const { result } = renderHook(() => useCreateCarTrip({ onErrorCallback }));

    // Act: Try to create a trip and expect it to fail
    await expect(() => result.current.mutateAsync(newTrip)).rejects.toThrow();

    // Assert
    expect(onErrorCallback).toHaveBeenCalledWith(
      expect.any(Error),
      newTrip,
      undefined
    );
  });
  it("should not call the success callback when the create trip mutation fails", () => {
    // Arrange
    // Mock error response from server
    server.use(
      http.post(apiPath("/trips/car"), async () => {
        throw HttpResponse.error();
      })
    );
    const onSuccessCallback = jest.fn();
    // Render hook
    const { result } = renderHook(() =>
      useCreateCarTrip({ onSuccessCallback })
    );

    // Act: Try to create a trip and expect it to fail
    expect(() => result.current.mutateAsync(newTrip)).rejects.toThrow();

    // Assert
    expect(onSuccessCallback).not.toHaveBeenCalled();
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
    const { result } = renderHook(() => useUpdateTrip());
    const tripData = {
      ...existingTrip,
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

  it("should call the success callback when the update trip API is successful", async () => {
    // Arrange
    const onSuccessCallback = jest.fn();
    const tripData = {
      ...existingTrip,
      id: 1,
      origin: "Cali",
      destination: "Barrancabermeja",
    };
    const { result } = renderHook(() => useUpdateTrip({ onSuccessCallback }));

    // Act: Perform the mutation
    await result.current.mutateAsync(tripData);

    // Assert
    expect(onSuccessCallback).toHaveBeenCalledWith(
      tripData,
      tripData,
      undefined
    );
  });

  it("should not call the error callback when the update trip API is successful", async () => {
    // Arrange
    const onErrorCallback = jest.fn();
    const { result } = renderHook(() => useUpdateTrip({ onErrorCallback }));

    // Act: Perform the mutation
    await result.current.mutateAsync(existingTrip);

    // Assert
    expect(onErrorCallback).not.toHaveBeenCalled();
  });

  it("should call the error callback when the update trip API throws an error", async () => {
    // Arrange
    // Mock error response from server
    server.use(
      http.put(apiPath("/trips/car/:trip_id"), async () => {
        throw HttpResponse.error();
      })
    );
    const onErrorCallback = jest.fn();
    // Render hook
    const { result } = renderHook(() => useUpdateTrip({ onErrorCallback }));

    // Act: Try to create a trip and expect it to fail
    await expect(result.current.mutateAsync(existingTrip)).rejects.toThrow();

    // Assert
    expect(onErrorCallback).toHaveBeenCalledWith(
      expect.any(Error),
      existingTrip,
      undefined
    );
  });

  it("should not call the success callback when the update trip API fails", () => {
    // Arrange
    // Mock error response from server
    server.use(
      http.put(apiPath("/trips/car/:trip_id"), async () => {
        throw HttpResponse.error();
      })
    );
    const onSuccessCallback = jest.fn();
    // Render hook
    const { result } = renderHook(() => useUpdateTrip({ onSuccessCallback }));

    // Act: Try to create a trip and expect it to fail
    expect(() => result.current.mutateAsync(existingTrip)).rejects.toThrow();

    // Assert
    expect(onSuccessCallback).not.toHaveBeenCalled();
  });
});
