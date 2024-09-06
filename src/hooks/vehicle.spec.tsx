import { getQueryClient } from "@/api/queryClient";
import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { renderHook } from "@/testUtils";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { act, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { useCreateVehicle, useUpdateVehicle } from "./vehicle";

type Vehicle = components["schemas"]["VehicleSchema"];
type VehicleCreate = components["schemas"]["VehicleCreateSchema"];

const mockVehicleCreate: VehicleCreate = {
  name: "Car 1",
  make: "Toyota",
  model: "Corolla",
  year: 2020,
  odometer: 0,
  license_plate: "",
  color: "white",
  vehicle_type: "car",
};
const mockVehicle: Vehicle = { ...mockVehicleCreate, id: 123 };

const queryClient = getQueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCreateVehicle", () => {
  beforeAll(() => {
    server.use(
      http.post<any, VehicleCreate, Vehicle, string>(
        apiPath("/vehicles"),
        async ({ request }) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const newVehicle = await request.json();
          return HttpResponse.json<Vehicle>({
            ...newVehicle,
            id: 1,
          });
        }
      )
    );
  });

  it("should return vehicle data with id when request is successful", async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useCreateVehicle({}), { wrapper });

    // Act: Perform the mutation
    await act(async () => {
      await result.current.mutateAsync({
        name: "Car 1",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        odometer: 0,
        license_plate: "",
        vehicle_type: "car",
      });
    });

    // Assert: Check for id property in the response data
    await waitFor(async () => {
      expect(result.current.data).toHaveProperty("id");
      expect(result.current.data?.id).toEqual(1);
    });
  });

  it("should set data when request succeeds", async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useCreateVehicle({}), { wrapper });

    // Act: Perform the mutation
    await act(async () => {
      await result.current.mutateAsync(mockVehicleCreate);
    });

    // Assert: Check data in the response
    await waitFor(async () => {
      expect(result.current.data).toBe(mockVehicle);
    });
  });

  it("should invalidate the vehicles query when request succeeds", async () => {
    // Arrange: Render hooks
    const { result } = renderHook(() => useCreateVehicle({}), { wrapper });
    // Render a vehicles query that should be invalidated.
    const { result: vehiclesQuery } = renderHook(
      () => useQuery({ queryKey: ["vehicles"], queryFn: () => [] }),
      { wrapper }
    );
    // Wait for vehicles query to resolve
    await waitFor(() => vehiclesQuery.current.isSuccess);
    expect(vehiclesQuery.current.isStale).toBe(false);

    // Act: Perform the mutation
    await act(async () => {
      await result.current.mutateAsync(mockVehicleCreate);
    });

    // Assert: Check if the vehicles query is invalidated
    expect(vehiclesQuery.current.isStale).toBe(true);
  });

  it("should call onError when the request fails", async () => {
    const onError = jest.fn();

    // Mock the error response for the vehicle creation API
    server.use(
      http.post<any, VehicleCreate, Vehicle, string>(
        apiPath("/vehicles/"),
        () => {
          throw HttpResponse.error();
        }
      )
    );

    const { result } = renderHook(() => useCreateVehicle({ onError }), {
      wrapper,
    });

    // Act: Try to create a vehicle and expect it to fail
    await act(async () => {
      await result.current.mutateAsync(mockVehicle).catch(() => {});
    });

    // Ensure that the onError callback is called with the correct error
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      mockVehicle,
      undefined
    );
  });
});

describe("useUpdateVehicle", () => {
  beforeEach(() => {
    server.use(
      http.put<any, VehicleCreate, Vehicle, string>(
        apiPath("/vehicles/123"),
        async ({ request }) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedVehicle = await request.json();
          return HttpResponse.json<Vehicle>({
            ...updatedVehicle,
            id: 123,
          });
        }
      )
    );
  });
  afterEach(() => server.resetHandlers());

  it("should return updated vehicle data when request is successful", async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useUpdateVehicle(), { wrapper });
    const updatedVehicle = { ...mockVehicle, name: "Car 2" };

    // Act: Perform the mutation
    await act(async () => {
      await result.current.mutateAsync(updatedVehicle);
    });

    // Assert: Check data in the response
    await waitFor(async () => {
      expect(result.current.data?.name).toBe("Car 2");
      expect(result.current.data?.id).toBe(123);
    });
  });

  it("should invalidate the vehicles query when request succeeds", async () => {
    // Arrange: Render hooks
    const { result: updateVehicleMutation } = renderHook(
      () => useUpdateVehicle(),
      { wrapper }
    );
    const updatedVehicle = { ...mockVehicle, name: "Car 2" };
    // Render a vehicles query that should be invalidated.
    const { result: vehiclesQuery } = renderHook(
      () => useQuery({ queryKey: ["vehicles"], queryFn: () => [] }),
      { wrapper }
    );
    // Wait for vehicles query to resolve
    await waitFor(() => vehiclesQuery.current.isSuccess);
    expect(vehiclesQuery.current.isStale).toBe(false);

    // Act: Perform the mutation
    await act(async () => {
      await updateVehicleMutation.current.mutateAsync(updatedVehicle);
    });
    expect(updateVehicleMutation.current.data).toEqual(updatedVehicle);

    // Assert: Check if the vehicles query is invalidated
    expect(vehiclesQuery.current.isStale).toBe(true);
  });

  it("should call onError when the request fails", async () => {
    // Arrange: Setup mocks and render the hook
    const onError = jest.fn();
    // Mock the error response for the vehicle update API
    server.use(
      http.put<any, VehicleCreate, Vehicle, string>(
        apiPath("/vehicles/123"),
        () => {
          throw HttpResponse.error();
        }
      )
    );

    const { result } = renderHook(() => useUpdateVehicle({ onError }), {
      wrapper,
    });

    // Act: Try to update a vehicle and expect it to fail
    await act(async () => {
      await result.current.mutateAsync(mockVehicle).catch(() => {});
    });

    // Ensure that the onError callback is called with the correct error
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      mockVehicle,
      undefined
    );
  });

  it("should call onSuccess when the request succeeds", async () => {
    // Arrange: Setup mocks and render the hook
    const onSuccess = jest.fn();
    const updatedVehicle = { ...mockVehicle, name: "Car 2" };

    const { result } = renderHook(() => useUpdateVehicle({ onSuccess }), {
      wrapper,
    });

    // Act: Try to update a vehicle and expect it to succeed
    await act(async () => {
      await result.current.mutateAsync(updatedVehicle);
    });

    // Ensure that the onSuccess callback is called with the correct data
    expect(onSuccess).toHaveBeenCalledWith(
      updatedVehicle,
      updatedVehicle,
      undefined
    );
  });
});
