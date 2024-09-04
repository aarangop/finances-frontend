import { InputLabel, MenuItem, Select } from "@mui/material";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type Currency = "COP" | "USD" | "EUR";

interface CurrencySelectProps<T extends FieldValues> {
  defaultCurrency: Currency;
  label: string;
  error: boolean;
  labelId: string;
  field: ControllerRenderProps<T>;
}

export default function CurrencySelect<T extends FieldValues>({
  defaultCurrency,
  label,
  labelId,
  field,
  error,
}: CurrencySelectProps<T>) {
  return (
    <>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        required
        labelId={labelId}
        label={label}
        error={error}
        {...field}
        value={defaultCurrency}
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
