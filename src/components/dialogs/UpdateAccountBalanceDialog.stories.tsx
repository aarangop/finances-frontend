import { components } from "@/api/schema";
import type { Meta, StoryObj } from "@storybook/react";
import UpdateAccountBalanceDialog from "./UpdateAccountBalanceDialog";

type Account = components["schemas"]["AccountSchema"];

const mockAccount: Account = {
  id: 123,
  account_alias: "Test Account",
  balance: 1000,
  currency: "USD",
  bank: "Testing Bank",
  holder: "Toto La Momposina",
  account_number: "987654321",
  expenses: [],
};

const meta = {
  title: "Dialogs/UpdateAccountBalanceDialog",
  component: UpdateAccountBalanceDialog,
  parameters: {
    layout: "centered",
    // Disable the modal backdrop and positioning
    docs: {
      story: {
        inline: true,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UpdateAccountBalanceDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    account: mockAccount,
    open: true,
    handleDialogClose: () => console.log("Dialog closed"),
  },
};
