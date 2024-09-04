import { InputLabel, MenuItem, Select } from "@mui/material";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type Currency = "COP" | "USD" | "EUR";

interface CurrencySelectProps<T extends FieldValues> {
  defaultCurrency: Currency;
  label: string;
  error: boolean;
  labelId: string;
  required?: boolean;
  field: ControllerRenderProps<T>;
}

export default function CurrencySelect<T extends FieldValues>({
  defaultCurrency,
  label,
  labelId,
  field,
  error,
  required = false,
}: CurrencySelectProps<T>) {
  const labelText = required ? `${label} *` : label;
  return (
    <>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        required={required}
        labelId={labelId}
        label={labelText}
        error={error}
        sx={{ fontFamily: "monospace" }}
        {...field}
        value={field.value || defaultCurrency}
      >
        <MenuItem value={"COP"} sx={{ fontFamily: "monospace" }}>
          $ COP
        </MenuItem>
        <MenuItem value={"USD"} sx={{ fontFamily: "monospace" }}>
          $ USD
        </MenuItem>
        <MenuItem value={"EUR"} sx={{ fontFamily: "monospace" }}>
          € EUR
        </MenuItem>
      </Select>
    </>
  );
}
