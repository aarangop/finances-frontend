import { components } from "@/api/schema";
import VehicleAutocomplete from "@/components/autocomplete/VehicleAutocomplete";
import server, { apiPath } from "@/mocks/node";
import { render } from "@/utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { ControllerRenderProps } from "react-hook-form";

type Vehicle = components["schemas"]["VehicleSchema"];

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Car 1",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    odometer: 18391,
    license_plate: "aaa-111",
    vehicle_type: "car",
    color: "white",
  },
  {
    id: 2,
    name: "Car 2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    odometer: 8912,
    license_plate: "abc-123",
    vehicle_type: "car",
    color: "blue",
  },
];

// Mocking the props for the VehicleAutocomplete component
const mockField: ControllerRenderProps<any> = {
  name: "vehicle",
  value: "",
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe("VehicleAutocomplete", () => {
  beforeEach(() => {
    server.use(
      http.get<any, any, Vehicle[], string>(apiPath("/vehicles/"), () => {
        return HttpResponse.json<Vehicle[]>(mockVehicles);
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears all mock functions
    server.resetHandlers(); // Reset handlers after every test
  });

  test("renders with a label", () => {
    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={jest.fn()}
        field={mockField}
      />
    );
    expect(screen.getByLabelText("Select Vehicle")).toBeInTheDocument();
  });

  test("renders loading state", async () => {
    // Render the component
    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={jest.fn()}
        field={mockField}
      />
    );

    // Check for loading state without any delay
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Wait for the progressbar to disappear after the vehicles are fetched
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  test("displays options when typing", async () => {
    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={jest.fn()}
        field={mockField}
      />
    );

    const input = screen.getByLabelText("Select Vehicle");
    fireEvent.focus(input);
    userEvent.type(input, "Car");

    await waitFor(() => {
      expect(
        screen.getByText("Car 1 - Toyota Corolla 2020")
      ).toBeInTheDocument();
      expect(screen.getByText("Car 2 - Honda Civic 2019")).toBeInTheDocument();
    });
  });

  test("calls onVehicleSelect when an option is selected", async () => {
    const mockOnVehicleSelect = jest.fn();

    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={mockOnVehicleSelect}
        field={mockField}
      />
    );

    const input = screen.getByLabelText("Select Vehicle");
    fireEvent.focus(input);
    userEvent.type(input, "Car 1");

    await waitFor(() => {
      expect(
        screen.getByText("Car 1 - Toyota Corolla 2020")
      ).toBeInTheDocument();
    });

    // Select the first option
    fireEvent.click(screen.getByText("Car 1 - Toyota Corolla 2020"));

    expect(mockField.onChange).toHaveBeenCalledWith(mockVehicles[0]);
    expect(mockOnVehicleSelect).toHaveBeenCalledWith(mockVehicles[0]);
  });

  test("does not call onVehicleSelect when value is null", async () => {
    const mockOnVehicleSelect = jest.fn();

    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={mockOnVehicleSelect}
        field={mockField}
      />
    );

    const input = screen.getByLabelText("Select Vehicle");
    fireEvent.focus(input);
    userEvent.type(input, "Car");

    await waitFor(() => {
      expect(
        screen.getByText("Car 1 - Toyota Corolla 2020")
      ).toBeInTheDocument();
    });

    // Clear the input
    fireEvent.change(input, { target: { value: "" } });

    expect(mockOnVehicleSelect).not.toHaveBeenCalled();
  });
});
