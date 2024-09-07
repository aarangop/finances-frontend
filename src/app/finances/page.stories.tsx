import { Meta, StoryObj } from "@storybook/react";
import RootLayout from "../layout";
import FinancesPage from "./page";

const meta: Meta<typeof FinancesPage> = {
  title: "pages/finances/page",
  component: FinancesPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
