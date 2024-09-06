import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { render } from "@/testUtils";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import CarTripForm from "./CarTripForm";

type Vehicle = components["schemas"]["VehicleSchema"];

const mockVehicles: Vehicle[] = [
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
];
describe("Car Trip Form UI", () => {
  it("Renders empty origin field for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Origin *")).toHaveValue("");
  });

  it("shows origin required error message", () => {
    render(<CarTripForm />);

    expect(screen.queryByText("Origin is required")).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(screen.getByText("Origin is required")).toBeInTheDocument();
    });
  });

  it("shows origin too short error message", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByText("Origin must contain at least two characters")
    ).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(
        screen.getByText("Origin must contain at least two characters")
      ).toBeInTheDocument();
    });
  });

  it("shows destination required error message", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByText("Destination is required")
    ).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(screen.getByText("Destination is required")).toBeInTheDocument();
    });
  });

  test("end date is disabled when start date is not set", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toBeDisabled();
  });

  test("end date is enabled when start date is set", () => {
    render(<CarTripForm />);

    screen.getByLabelText("Start *").focus();
    fireEvent.change(screen.getByLabelText("Start *"), {
      target: { value: "22/08/2024" },
    });

    expect(screen.getByLabelText("End *")).not.toBeDisabled();
  });

  it("renders empty destination for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Destination *")).toHaveValue("");
  });

  it("renders empty start date for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Start *")).toHaveValue("");
  });

  it("renders empty end date for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toHaveValue("");
  });

  test("end date is initially disabled", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toBeDisabled();
  });

  it("enables end date when start date is set", () => {
    render(<CarTripForm />);

    screen.getByLabelText("Start *").focus();
    fireEvent.change(screen.getByLabelText("Start *"), {
      target: { value: "22/08/2024" },
    });

    expect(screen.getByLabelText("End *")).not.toBeDisabled();
  });

  it("doesn't render delete button for new car trip", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  test("save button is disabled when form is invalid", () => {
    render(<CarTripForm />);

    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  test("save button is enabled when form is valid", async () => {
    // Mock vehicles API
    server.use(
      http.get<any, Vehicle[], any, string>(apiPath("/vehicles/"), async () => {
        return HttpResponse.json<Vehicle[]>(mockVehicles);
      })
    );

    render(<CarTripForm />);

    await act(async () => {
      screen.getByLabelText("Origin *").focus();
      fireEvent.change(screen.getByLabelText("Origin *"), {
        target: { value: "City A" },
      });

      screen.getByLabelText("Destination *").focus();
      fireEvent.change(screen.getByLabelText("Destination *"), {
        target: { value: "City B" },
      });

      screen.getByLabelText("Start *").focus();
      fireEvent.change(screen.getByLabelText("Start *"), {
        target: { value: "22/08/2024" },
      });

      screen.getByLabelText("End *").focus();
      fireEvent.change(screen.getByLabelText("End *"), {
        target: { value: "23/08/2024" },
      });

      screen.getByLabelText("Vehicle *").focus();
      userEvent.type(screen.getByLabelText("Vehicle *"), "Carolita");
      expect(
        screen.getByText("Carolita - Toyota Corolla 2020")
      ).toBeInTheDocument();
      screen.getByText("Carolita - Toyota Corolla 2020").click();
      screen.getByLabelText("Vehicle *").blur();
    });

    expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();
  });
});

describe("Car Trip Form API", () => {
  beforeAll(() => {
    // Mock vehicles API
    server.use(
      http.get<any, Vehicle[], any, string>(apiPath("/vehicles/"), async () => {
        return HttpResponse.json<Vehicle[]>(mockVehicles);
      })
    );
  });

  it("creates a new car trip", async () => {
    render(<CarTripForm />);

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
    userEvent.type(vehicleInput, "Carolita");

    await waitFor(() => {
      expect(
        screen.getByText("Carolita - Toyota Corolla 2020")
      ).toBeInTheDocument();
    });

    screen.getByRole("button", { name: /save/i }).click();

    await waitFor(() => {
      expect(screen.getByText("Trip created successfully")).toBeInTheDocument();
    });
  });
});
