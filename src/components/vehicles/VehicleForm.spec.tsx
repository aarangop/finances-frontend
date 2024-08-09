import { render, screen } from "@testing-library/react";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { components } from "@/api/schema";

type Vehicle = components["schemas"]["Vehicle"];

describe("VehicleForm", () => {
  const mockVehicle: Vehicle = {
    id: 1,
    name: "Test Vehicle",
    brand: "Test Brand",
    model: "Test Model",
    year: 2022,
    trips: [],
  };

  it("renders the form and all fields correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);

    // Check if the "Name" field is rendered with the correct label and value
    const nameField = screen.getByLabelText(/name/i) as HTMLInputElement;
    expect(nameField).toBeInTheDocument();
    expect(nameField.value).toBe(mockVehicle.name);
  });

  it("renders the brand field correctly", () => {
    render(<VehicleForm vehicle={mockVehicle} />);
    // Check if the "Brand" field is rendered with the correct label and value
    const brandField = screen.getByLabelText(/brand/i) as HTMLInputElement;
    expect(brandField).toBeInTheDocument();
    expect(brandField.value).toBe(mockVehicle.brand);
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
