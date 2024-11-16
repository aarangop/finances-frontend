import type { Meta, StoryObj } from "@storybook/react";
import AccountCard from "./AccountCard";

const meta: Meta<typeof AccountCard> = {
  title: "Components/Cards/AccountCard",
  component: AccountCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AccountCard>;

export const Default: Story = {
  args: {
    account: {
      id: 1,
      bank: "Bank of America",
      account_alias: "Main Checking",
      account_number: "****1234",
      holder: "John Doe",
      balance: 1234.56,
      currency: "USD",
      expenses: [],
    },
  },
};
