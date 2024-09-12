import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { render } from "@/utils/testing";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import AccountForm from "./AccountForm";

type Account = components["schemas"]["AccountSchema"];
type AccountCreate = components["schemas"]["AccountCreateSchema"];

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

describe("AccountForm UI", () => {
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
      screen.getByLabelText("Account Alias *").focus();
      screen.getByLabelText("Account Alias *").blur();
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
      screen.getByLabelText("Holder *").focus();
      screen.getByLabelText("Holder *").blur();
    });
    expect(screen.getByText("Holder is required")).toBeInTheDocument();
  });

  it("hides error message for holder when holder is valid", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Holder is required")).not.toBeInTheDocument();
    await act(async () => {
      screen.getByLabelText("Holder *").focus();
      screen.getByLabelText("Holder *").blur();
    });

    expect(screen.getByText("Holder is required")).toBeInTheDocument();

    await act(async () => {
      screen.getByLabelText("Holder *").focus();
      fireEvent.change(screen.getByLabelText("Holder *"), {
        target: { value: "My Self" },
      });
      screen.getByLabelText("Holder *").blur();
    });

    expect(screen.queryByText("Holder is required")).not.toBeInTheDocument();
  });

  it("renders empty bank field", () => {
    render(<AccountForm account={null} />);

    expect(screen.getByLabelText("Bank *")).toHaveValue("");
  });

  it("renders error message for empty bank", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Bank is required")).not.toBeInTheDocument();

    await act(async () => {
      screen.getByLabelText("Bank *").focus();
      screen.getByLabelText("Bank *").blur();
    });

    expect(screen.getByText("Bank is required")).toBeInTheDocument();
  });

  it("does not render error message for bank when bank is valid", async () => {
    render(<AccountForm account={null} />);
    expect(screen.queryByText("Bank is required")).not.toBeInTheDocument();

    await act(async () => {
      screen.getByLabelText("Bank *").focus();
      fireEvent.change(screen.getByLabelText("Bank *"), {
        target: { value: "Test bank" },
      });
      screen.getByLabelText("Bank *").blur();
    });

    expect(screen.queryByText("Bank is required")).not.toBeInTheDocument();
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
      screen.getByLabelText("Account Number / IBAN *").focus();
      screen.getByLabelText("Account Number / IBAN *").blur();
    });
    expect(
      screen.getByText("Account number or IBAN is required")
    ).toBeInTheDocument();
  });

  it("does not render error message for account number when valid", async () => {
    render(<AccountForm account={null} />);
    expect(
      screen.queryByText("Account number or IBAN is required")
    ).not.toBeInTheDocument();

    await act(async () => {
      screen.getByLabelText("Account Number / IBAN *").focus();
      fireEvent.change(screen.getByLabelText("Account Number / IBAN *"), {
        target: { value: "1234567890" },
      });
      screen.getByLabelText("Account Number / IBAN *").blur();
    });

    expect(
      screen.queryByText("Account number or IBAN is required")
    ).not.toBeInTheDocument();
  });

  it("renders error message for invalid account number", async () => {
    render(<AccountForm account={null} />);
    expect(
      screen.queryByText("Invalid account number or IBAN")
    ).not.toBeInTheDocument();
    const accountNumberField = screen.getByLabelText("Account Number / IBAN *");

    await act(async () => {
      accountNumberField.focus();
      fireEvent.change(accountNumberField, {
        target: { value: "invalid account number" },
      });
      accountNumberField.blur();
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

  test("save button is disabled when form is incomplete", () => {
    render(<AccountForm account={null} />);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  test("save button is enabled when form is complete and valid", async () => {
    render(<AccountForm account={null} />);

    await act(async () => {
      screen.getByLabelText("Bank *").focus();
      fireEvent.change(screen.getByLabelText("Bank *"), {
        target: { value: "Test bank" },
      });
      screen.getByLabelText("Bank *").blur();

      screen.getByLabelText("Holder *").focus();
      fireEvent.change(screen.getByLabelText("Holder *"), {
        target: { value: "My Self" },
      });
      screen.getByLabelText("Holder *").blur();

      screen.getByLabelText("Balance *").focus();
      fireEvent.change(screen.getByLabelText("Balance *"), {
        target: { value: 100000 },
      });
      screen.getByLabelText("Balance *").blur();

      screen.getByLabelText("Account Number / IBAN *").focus();
      fireEvent.change(screen.getByLabelText("Account Number / IBAN *"), {
        target: { value: "1234567890" },
      });
      screen.getByLabelText("Account Number / IBAN *").blur();

      screen.getByLabelText("Account Alias *").focus();
      fireEvent.change(screen.getByLabelText("Account Alias *"), {
        target: { value: "Test Account" },
      });
      screen.getByLabelText("Account Alias *").blur();
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).not.toBeDisabled();
  });
});

describe("AccountForm API", () => {
  beforeEach(async () => {
    render(<AccountForm account={null} />);
    // Fill out form
    await act(async () => {
      screen.getByLabelText("Bank *").focus();
      fireEvent.change(screen.getByLabelText("Bank *"), {
        target: { value: "Test bank" },
      });
      screen.getByLabelText("Bank *").blur();

      screen.getByLabelText("Holder *").focus();
      fireEvent.change(screen.getByLabelText("Holder *"), {
        target: { value: "My Self" },
      });
      screen.getByLabelText("Holder *").blur();

      screen.getByLabelText("Balance *").focus();
      fireEvent.change(screen.getByLabelText("Balance *"), {
        target: { value: 100000 },
      });
      screen.getByLabelText("Balance *").blur();

      screen.getByLabelText("Account Number / IBAN *").focus();
      fireEvent.change(screen.getByLabelText("Account Number / IBAN *"), {
        target: { value: "1234567890" },
      });
      screen.getByLabelText("Account Number / IBAN *").blur();

      screen.getByLabelText("Account Alias *").focus();
      fireEvent.change(screen.getByLabelText("Account Alias *"), {
        target: { value: "Test Account" },
      });
      screen.getByLabelText("Account Alias *").blur();
    });

    expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();
  });

  it("disables save button while post request pending", async () => {
    server.use(
      http.post<any, AccountCreate, Account, string>(
        apiPath("/accounts/"),
        async ({ request }) => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const account = await request.json();
          return HttpResponse.json<Account>({ ...account, id: 123 });
        }
      )
    );
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).not.toBeDisabled();
    await act(async () => {
      saveButton.click();
    });
    expect(saveButton).toBeDisabled();
    waitFor(() => expect(saveButton).not.toBeDisabled());
  });
});
