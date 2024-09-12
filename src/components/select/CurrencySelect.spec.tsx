import { render } from "@/utils/testing";
import { screen } from "@testing-library/react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CurrencySelect from "./CurrencySelect";

const fieldMock: ControllerRenderProps<FieldValues> = {
  name: "currency",
  ref: jest.fn(),
  value: "COP",
  onChange: jest.fn(),
  onBlur: jest.fn(),
};
describe("CurrencySelect", () => {
  it("renders the select", () => {
    render(
      <CurrencySelect
        defaultCurrency="COP"
        label="Currency"
        labelId="currency"
        error={false}
        field={fieldMock}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(
      <CurrencySelect
        defaultCurrency="COP"
        label="The Currency"
        labelId="currency"
        error={false}
        field={fieldMock}
        required={false}
      />
    );
    expect(
      screen.getByText("The Currency", { selector: "label" })
    ).toBeInTheDocument();
  });

  it("renders label with * when required", () => {
    render(
      <CurrencySelect
        defaultCurrency="COP"
        label="The Currency"
        labelId="currency"
        error={false}
        field={fieldMock}
        required={true}
      />
    );
    expect(
      screen.getByText("The Currency *", { selector: "label" })
    ).toBeInTheDocument();
  });

  it("renders the default currency", () => {
    render(
      <CurrencySelect
        defaultCurrency="COP"
        label="Currency"
        labelId="currency"
        error={false}
        field={fieldMock}
      />
    );
    expect(screen.getByText("$ COP")).toBeInTheDocument();
  });

  it("sets the default currency value", () => {
    render(
      <CurrencySelect
        defaultCurrency="COP"
        label="Currency"
        labelId="currency"
        error={false}
        field={{
          ...fieldMock,
          value: null, // Change value to null, so the default currency is used
        }}
      />
    );
    expect(fieldMock.value).toBe("COP");
  });

  it("renders the default currency value", () => {
    render(
      <CurrencySelect
        defaultCurrency="EUR"
        label="Currency"
        labelId="currency"
        error={false}
        field={{
          ...fieldMock,
          value: null, // Change value to null, so the default currency is used
        }}
      />
    );
    // This locator matches the div that's used to display the selected value
    const inputElement = screen.getByRole("combobox");
    expect(inputElement).toHaveTextContent("€ EUR");
  });
});
