import { components } from "@/api/schema";
import { useUpdateAccountBalance } from "@/hooks/account";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import BalanceUpdateForm, { BalanceUpdateFormRef } from "./BalanceUpdateForm";

type Account = components["schemas"]["AccountSchema"];

// Mock the custom hook
jest.mock("@/hooks/account", () => ({
  useUpdateAccountBalance: jest.fn(),
}));

describe("BalanceUpdateForm", () => {
  const mockAccount: Account = {
    id: 123,
    balance: 1000,
    currency: "USD",
    account_alias: "Test Account",
    bank: "Test bank",
    holder: "No Nomber",
    account_number: "123456789",
    expenses: [],
  };

  const mockMutate = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateAccountBalance as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders with initial balance value", () => {
    render(<BalanceUpdateForm account={mockAccount} />);

    const input = screen.getByLabelText(/Balance in USD/i) as HTMLInputElement;
    expect(input.value).toBe("1000");
  });

  it("validates required field", async () => {
    render(<BalanceUpdateForm account={mockAccount} />);

    const input = screen.getByLabelText(/Balance in USD/i);
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText("Balance is required")).toBeInTheDocument();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("validates minimum value", async () => {
    render(<BalanceUpdateForm account={mockAccount} />);

    const input = screen.getByLabelText(/Balance in USD/i);
    fireEvent.change(input, { target: { value: "-1" } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText("Balance must be positive")).toBeInTheDocument();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    render(
      <BalanceUpdateForm
        account={mockAccount}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    const input = screen.getByLabelText(/Balance in USD/i);
    fireEvent.change(input, { target: { value: 2000 } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ balance: 2000 });
    });
  });

  it("handles submit through ref", async () => {
    const ref = createRef<BalanceUpdateFormRef>();

    render(
      <BalanceUpdateForm
        ref={ref}
        account={mockAccount}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    const input = screen.getByLabelText(/Balance in USD/i);
    fireEvent.change(input, { target: { value: "2000" } });

    ref.current?.submit();

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ balance: 2000 });
    });
  });
});
