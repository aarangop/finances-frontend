"use client";

import client from "@/api/apiClient";
import { components } from "@/api/schema";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface VehicleAutocompleteProps<T extends FieldValues> {
  label?: string;
  onVehicleSelect: (vehicle: Vehicle) => void;
  field: ControllerRenderProps<T>;
}
type Vehicle = components["schemas"]["VehicleSchema"];
/**
 * Auto-complete input for selecting a vehicle
 * @returns
 */
export default function VehicleAutocomplete<T extends FieldValues>({
  label,
  onVehicleSelect,
  field,
}: VehicleAutocompleteProps<T>) {
  const { data: vehicles, isPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => client.GET("/vehicles/"),
  });

  return (
    <Autocomplete
      {...field}
      options={vehicles?.data || []}
      getOptionLabel={(vehicle) =>
        `${vehicle.name} - ${vehicle.make} ${vehicle.model} ${vehicle.year}`
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      multiple={false}
      onChange={(_, value) => {
        field.onChange(value);
        if (value !== null) {
          onVehicleSelect(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Vehicle"}
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
