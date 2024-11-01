import { components } from "@/api/schema";

type Vehicle = components["schemas"]["VehicleSchema"];
type VehicleCreate = components["schemas"]["VehicleCreateSchema"];

export const mockVehicles: Vehicle[] = [
  {
    name: "Bumblebee",
    make: "Chevrolet",
    model: "Camaro",
    year: 2010,
    odometer: 50000,
    license_plate: "ABC123",
    vehicle_type: "car",
    id: 1,
  },
  {
    name: "Bigfoot",
    make: "Ford",
    model: "F-150",
    year: 2015,
    odometer: 100000,
    license_plate: "XYZ789",
    vehicle_type: "truck",
    id: 2,
  },
];
