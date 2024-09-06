import { Meta, StoryObj } from "@storybook/react";
import VehicleCardSkeleton from "./VehicleCardSkeleton";

const meta = {
  title: "cards/VehicleCardSkeleton",
  component: VehicleCardSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof VehicleCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
