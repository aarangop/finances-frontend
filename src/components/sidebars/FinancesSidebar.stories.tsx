import { Meta, StoryObj } from "@storybook/react";
import FinancesSidebar from "./FinancesSidebar";

const meta = {
  title: "layout/FinancesSidebar",
  component: FinancesSidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof FinancesSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const Left: Story = {
  args: {
    anchor: "left",
    isOpen: true,
  },
};

export const Right: Story = {
  args: {
    anchor: "right",
    isOpen: true,
  },
};
