import { components } from "@/api/schema";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import UpdateAccountBalanceDialog from "./UpdateAccountBalanceDialog";

// Mock the BalanceUpdateForm component
jest.mock("../forms/BalanceUpdateForm", () => ({
  __esModule: true,
  default: jest.fn(({ onSuccess, onError }) => (
    <div data-testid="mock-balance-form">
      <button onClick={() => onSuccess()}>Trigger Success</button>
      <button onClick={() => onError(new Error("Test error"))}>
        Trigger Error
      </button>
    </div>
  )),
}));

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

describe("UpdateAccountBalanceDialog", () => {
  const renderDialog = (props = {}) => {
    return render(
      <SnackbarProvider>
        <UpdateAccountBalanceDialog
          account={mockAccount}
          open={true}
          handleDialogClose={jest.fn()}
          {...props}
        />
      </SnackbarProvider>
    );
  };

  it("renders dialog with correct title", () => {
    renderDialog();
    expect(
      screen.getByText(`Update Balance for 'Test Account'`)
    ).toBeInTheDocument();
  });

  it("calls handleDialogClose when Cancel button is clicked", () => {
    const handleDialogClose = jest.fn();
    renderDialog({ handleDialogClose });

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleDialogClose).toHaveBeenCalled();
  });

  it("shows success notification and closes dialog on successful update", async () => {
    const handleDialogClose = jest.fn();
    renderDialog({ handleDialogClose });

    fireEvent.click(screen.getByText("Trigger Success"));

    await waitFor(() => {
      expect(
        screen.getByText("Balance updated successfully")
      ).toBeInTheDocument();
      expect(handleDialogClose).toHaveBeenCalled();
    });
  });

  it("shows error notification on update failure", async () => {
    renderDialog();

    fireEvent.click(screen.getByText("Trigger Error"));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to update balance: Test error")
      ).toBeInTheDocument();
    });
  });

  it("triggers form submission when Update button is clicked", () => {
    renderDialog();
    const updateButton = screen.getByText("Update");

    fireEvent.click(updateButton);
    expect(screen.getByTestId("mock-balance-form")).toBeInTheDocument();
  });
});
