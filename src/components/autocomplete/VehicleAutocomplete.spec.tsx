import { components } from "@/api/schema";
import VehicleAutocomplete from "@/components/autocomplete/VehicleAutocomplete";
import server, { apiPath } from "@/mocks/node";
import { useQuery } from "@tanstack/react-query";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { ControllerRenderProps } from "react-hook-form";

// Mock useQuery from React Query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

// Mocking Vehicle Data
const mockVehicles = [
  {
    id: 1,
    name: "Car 1",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
  },
  {
    id: 2,
    name: "Car 2",
    make: "Honda",
    model: "Civic",
    year: 2019,
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
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: mockVehicles },
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  test("renders loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isPending: true,
    });

    render(
      <VehicleAutocomplete
        label="Select Vehicle"
        onVehicleSelect={jest.fn()}
        field={mockField}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
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

type Vehicle = components["schemas"]["VehicleSchema"];

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
