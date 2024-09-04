import { components } from "@/api/schema";
import { render } from "@/testUtils";
import { act, fireEvent, screen } from "@testing-library/react";
import AccountForm from "./AccountForm";

type Account = components["schemas"]["AccountSchema"];

const testAccount: Account = {
  id: 1,
  bank: "Test bank",
  holder: "My Self",
  balance: 100000,
  currency: "COP",
  account_number: "1234567890",
  account_alias: "Test Account",
  expenses: [],
};

describe("AccountForm", () => {
  it("renders the form", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders empty account alias field", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByLabelText("Account Alias *")).toHaveValue("");
  });

  it("renders error message for empty account alias", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Alias is required")).not.toBeInTheDocument();
    await act(async () => {
      screen.getByRole("button", { name: /save/i }).click();
    });
    expect(screen.getByText("Alias is required")).toBeInTheDocument();
  });

  it("renders empty holder field", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByLabelText("Holder *")).toHaveValue("");
  });

  it("renders error message for empty holder", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Holder is required")).not.toBeInTheDocument();
    await act(async () => {
      screen.getByRole("button", { name: /save/i }).click();
    });
    expect(screen.getByText("Holder is required")).toBeInTheDocument();
  });

  it("renders empty bank field", () => {
    render(<AccountForm account={null} />);

    expect(screen.getByLabelText("Bank *")).toHaveValue("");
  });

  it("renders error message for empty bank", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Bank is required")).not.toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: /save/i }).click();
    });

    expect(screen.getByText("Bank is required")).toBeInTheDocument();
  });

  it("renders empty account number field", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByLabelText("Account Number / IBAN *")).toHaveValue("");
  });

  it("renders error message for empty account number", async () => {
    render(<AccountForm account={null} />);
    expect(
      screen.queryByText("Account number or IBAN is required")
    ).not.toBeInTheDocument();
    await act(async () => {
      screen.getByRole("button", { name: /save/i }).click();
    });
    expect(
      screen.getByText("Account number or IBAN is required")
    ).toBeInTheDocument();
  });

  it("renders error message for invalid account number", async () => {
    render(<AccountForm account={null} />);
    expect(
      screen.queryByText("Invalid account number or IBAN")
    ).not.toBeInTheDocument();
    const accountNumberField = screen.getByLabelText("Account Number / IBAN *");

    fireEvent.change(accountNumberField, {
      target: { value: "invalid account number" },
    });
    await act(async () => {
      screen.getByRole("button", { name: /save/i }).click();
    });

    expect(
      screen.getByText("Invalid account number or IBAN")
    ).toBeInTheDocument();
  });

  it("renders balance field with value zero", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByLabelText("Balance *")).toHaveValue(0);
  });

  it("renders the form with account bank", () => {
    const accountData: Account = { ...testAccount, bank: "Test bank" };
    render(<AccountForm account={accountData} />);
    expect(screen.getByLabelText("Bank *")).toHaveValue("Test bank");
  });

  it("renders the form with account holder", () => {
    const accountData: Account = { ...testAccount, holder: "My Self" };
    render(<AccountForm account={accountData} />);
    expect(screen.getByLabelText("Holder *")).toHaveValue("My Self");
  });

  it("renders the form with account balance", () => {
    const accountData: Account = { ...testAccount, balance: 100000 };
    render(<AccountForm account={accountData} />);
    expect(screen.getByLabelText("Balance *")).toHaveValue(100000);
  });

  it("renders the form with account number", () => {
    const accountData: Account = {
      ...testAccount,
      account_number: "1234567890",
    };
    render(<AccountForm account={accountData} />);
    expect(screen.getByLabelText("Account Number / IBAN *")).toHaveValue(
      "1234567890"
    );
  });

  it("renders the form with account currency", () => {
    const accountData: Account = { ...testAccount, currency: "EUR" };
    render(<AccountForm account={accountData} />);
    const currencySelect = screen.getByLabelText("Currency");
    expect(currencySelect).toHaveTextContent("€ EUR");
  });

  it("renders the form with account alias", () => {
    const accountData: Account = {
      ...testAccount,
      account_alias: "Test Account",
    };
    render(<AccountForm account={accountData} />);
    expect(screen.getByLabelText("Account Alias *")).toHaveValue(
      "Test Account"
    );
  });
});
