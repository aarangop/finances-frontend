import { components } from "@/api/schema";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { render } from "@/testUtils";
import { screen } from "@testing-library/react";
import Providers from "../providers/Providers";

type Vehicle = components["schemas"]["VehicleSchema"];

const mockVehicle: Vehicle = {
  id: 1,
  name: "Test Vehicle",
  make: "Test Brand",
  model: "Test Model",
  year: 2022,
  odometer: 95000,
  license_plate: "",
  vehicle_type: "car",
};

describe("VehicleForm", () => {
  it("renders the form and all fields correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);

    // Check if the "Name" field is rendered with the correct label and value
    const nameField = screen.getByLabelText(/name/i) as HTMLInputElement;
    expect(nameField).toBeInTheDocument();
    expect(nameField.value).toBe(mockVehicle.name);
  });

  it("renders the brand field correctly", () => {
    render(
      <Providers>
        <VehicleForm vehicle={mockVehicle} />
      </Providers>
    );
    // Check if the "Brand" field is rendered with the correct label and value
    const brandField = screen.getByLabelText(/make/i) as HTMLInputElement;
    expect(brandField).toBeInTheDocument();
    expect(brandField.value).toBe(mockVehicle.make);
  });

  it("Renders the model field correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);
    // Check if the "Model" field is rendered with the correct label and value
    const modelField = screen.getByLabelText(/model/i) as HTMLInputElement;
    expect(modelField).toBeInTheDocument();
    expect(modelField.value).toBe(mockVehicle.model);
  });
  it("renders the year field correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);
    // Check if the "Year" field is rendered with the correct label and value
    const yearField = screen.getByLabelText(/year/i) as HTMLInputElement;
    expect(yearField).toBeInTheDocument();
    expect(yearField.value).toBe(mockVehicle.year.toString());
  });
  it("renders the odometer field correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);
    // Check if the "Odometer Stand [km]" field is rendered with the correct label and value
    const odometerField = screen.getByLabelText(
      /odometer stand \[km\]/i
    ) as HTMLInputElement;
    expect(odometerField).toBeInTheDocument();
    expect(odometerField.value).toBe("95000");
  });
});
