import { components } from "@/api/schema";
import { render } from "@/utils/testing";
import { screen } from "@testing-library/react";
import VehicleCardGrid from "./VehicleCardGrid";

type Vehicle = components["schemas"]["VehicleSchema"];
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Car 1",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    odometer: 12950,
    color: "White",
    license_plate: "AAA-111",
    vehicle_type: "car",
  } as Vehicle,
  {
    id: 2,
    name: "Car 2",
    make: "BMW",
    model: "X3",
    year: 2014,
    odometer: 67909,
    color: "red",
    license_plate: "bbb-111",
    vehicle_type: "car",
  } as Vehicle,
  {
    id: 3,
    name: "Motorcycle 1",
    make: "Royal Enfield",
    model: "Himalayan 400",
    year: 2021,
    odometer: 10560,
    color: "Black",
    license_plate: "ccc-111",
    vehicle_type: "motorcycle",
  } as Vehicle,
];

describe("VehicleCardGrid", () => {
  it("should render error message when isError is true", () => {
    render(
      <VehicleCardGrid isLoading={false} isError={true} isSuccess={false} />
    );
    expect(screen.getByText("Error loading vehicles")).toBeInTheDocument();
  });

  it("should render loading skeletons when isLoading is true", () => {
    render(
      <VehicleCardGrid isLoading={true} isError={false} isSuccess={false} />
    );
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);
    render(
      <VehicleCardGrid
        isLoading={false}
        isError={false}
        isSuccess={true}
        vehicles={[]}
      />
    );
    expect(screen.queryByText(/Car/)).not.toBeInTheDocument();
  });
});
