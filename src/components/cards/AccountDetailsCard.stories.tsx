import { components } from "@/api/schema";
import { Meta, StoryObj } from "@storybook/react";
import AccountDetailsCard from "./AccountDetailsCard";

const meta = {
  title: "Components/cards/AccountDetailsCard",
  component: AccountDetailsCard,
} satisfies Meta<typeof AccountDetailsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

type Account = components["schemas"]["AccountSchema"];

const sampleAccount: Account = {
  account_alias: "Savings Account",
  account_number: "1234567890",
  holder: "Andres Arango Perez",
  currency: "USD",
  balance: 5000,
  bank: "Bank of Andres",
  expenses: [],
  id: 0,
};

export const Default: Story = {
  args: {
    account: sampleAccount,
  },
};
