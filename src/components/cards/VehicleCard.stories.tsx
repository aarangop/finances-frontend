import { components } from "@/api/schema";
import { Meta, StoryObj } from "@storybook/react";
import VehicleCard from "./VehicleCard";

const meta = {
  title: "cards/VehicleCard",
  component: VehicleCard,
  tags: ["autodocs"],
} satisfies Meta<typeof VehicleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

type Vehicle = components["schemas"]["VehicleSchema"];

export const Car: Story = {
  args: {
    vehicle: {
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
  },
};

export const Motorcycle: Story = {
  args: {
    vehicle: {
      id: 2,
      name: "Motorcycle 1",
      make: "Royal Enfield",
      model: "Himalayan 400",
      year: 2021,
      odometer: 10560,
      color: "Black",
      license_plate: "ccc-111",
      vehicle_type: "motorcycle",
    } as Vehicle,
  },
};

export const Truck: Story = {
  args: {
    vehicle: {
      id: 3,
      name: "Truck 1",
      make: "Ford",
      model: "F-150",
      year: 2018,
      odometer: 10560,
      color: "Black",
      license_plate: "ccc-111",
      vehicle_type: "truck",
    } as Vehicle,
  },
};
