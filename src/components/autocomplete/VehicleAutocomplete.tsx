"use client";

import getClient from "@/api/apiClient";
import { components } from "@/api/schema";
import { useGetVehicles } from "@/hooks/vehicle";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useRef } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface VehicleAutocompleteProps<T extends FieldValues> {
  label?: string;
  onVehicleSelect: (vehicle: Vehicle) => void;
  field: ControllerRenderProps<T>;
  required?: boolean;
}
type Vehicle = components["schemas"]["VehicleSchema"];

/**
 * VehicleAutocomplete component.
 *
 * @template T - Type parameter representing the field values.
 * @param {VehicleAutocompleteProps<T>} props - The component props.
 * @returns {JSX.Element} - The rendered VehicleAutocomplete component.
 */
export default function VehicleAutocomplete<T extends FieldValues>({
  label,
  onVehicleSelect,
  field,
  required = false,
}: VehicleAutocompleteProps<T>): JSX.Element {
  const client = useRef(getClient());
  const { data: vehicles, isPending } = useGetVehicles();

  return (
    <Autocomplete
      {...field}
      options={vehicles || []}
      getOptionLabel={(vehicle) =>
        `${vehicle.name} - ${vehicle.make} ${vehicle.model} ${vehicle.year}`
      }
      isOptionEqualToValue={(option, value) =>
        value === null || option.id === value.id
      }
      multiple={false}
      value={field.value || null}
      onChange={(_, value) => {
        field.onChange(value);

        if (value) {
          onVehicleSelect(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${label || "Vehicle"} ${required ? "*" : ""}`}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isPending ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
