import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { render } from "@/testUtils";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { ControllerRenderProps } from "react-hook-form";
import VehicleAutocomplete from "./VehicleAutocomplete";

type Vehicle = components["schemas"]["VehicleSchema"];

// Mocking the props for the VehicleAutocomplete component
const mockField: ControllerRenderProps<any> = {
  name: "vehicle",
  value: "",
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe("VehicleAutocomplete integration tests", () => {
  beforeAll(() => {
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
            name: "Marcelita",
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
  });

  it("renders list of vehicles from the API", async () => {
    // Render the VehicleAutocomplete component
    const onVehicleSelect = jest.fn();
    render(
      <VehicleAutocomplete
        onVehicleSelect={onVehicleSelect}
        field={mockField}
        label="Select Vehicle"
      />
    );

    const openButton = screen.getByRole("button", { name: /open/i });

    await act(async () => {
      userEvent.click(openButton);
    });

    // Wait for the vehicles to load
    await waitFor(async () => {
      expect(
        screen.getByText("Carolita - Toyota Corolla 2020")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Marcelita - Honda Civic 2019")
      ).toBeInTheDocument();
    });
  });
});
