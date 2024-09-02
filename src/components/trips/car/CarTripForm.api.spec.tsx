import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { render } from "@/testUtils";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import CarTripForm from "./CarTripForm";

type Vehicle = components["schemas"]["VehicleSchema"];

describe("Car Trip Form API", () => {
  it("creates a new car trip", async () => {
    render(<CarTripForm />);

    // Mock vehicles API
    server.use(
      http.get<any, Vehicle[], any, string>(apiPath("/vehicles/"), async () => {
        return HttpResponse.json<Vehicle[]>([
          {
            id: 1,
            name: "Carolita",
            make: "Toyota",
            model: "Corolla",
            year: 2020,
            odometer: 0,
            license_plate: "aaa-111",
            vehicle_type: "car",
          },
          {
            id: 2,
            name: "Car 2",
            make: "Honda",
            model: "Civic",
            year: 2019,
            odometer: 0,
            license_plate: "bbb-222",
            vehicle_type: "car",
          },
        ]);
      })
    );

    await act(async () => {
      screen.getByLabelText("Origin *").focus();
    });
    fireEvent.change(screen.getByLabelText("Origin *"), {
      target: { value: "City A" },
    });

    await act(async () => {
      screen.getByLabelText("Destination *").focus();
    });
    fireEvent.change(screen.getByLabelText("Destination *"), {
      target: { value: "Destination" },
    });

    await act(async () => {
      screen.getByLabelText("Start *").focus();
    });
    fireEvent.change(screen.getByLabelText("Start *"), {
      target: { value: "22/08/2024" },
    });

    await act(async () => {
      screen.getByLabelText("End *").focus();
    });
    fireEvent.change(screen.getByLabelText("End *"), {
      target: { value: "23/08/2024" },
    });

    const vehicleInput = screen.getByLabelText("Vehicle *");
    fireEvent.focus(vehicleInput);
    await userEvent.type(vehicleInput, "Carolita");

    await waitFor(() => {
      const option = screen.getByText("Carolita - Toyota Corolla 2020");
      expect(option).toBeInTheDocument();
    });

    screen.getByRole("button", { name: /save/i }).click();

    await waitFor(() => {
      expect(screen.getByText("Trip created successfully")).toBeInTheDocument();
    });
  });
});
