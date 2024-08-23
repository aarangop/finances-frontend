import { Autocomplete } from "@mui/material";

interface VehicleAutocompleteProps {
  /**
   * List of vehicle options
   */
  options: string[];
}

/**
 * Auto-complete input for selecting a vehicle
 * @returns
 */
export default function VehicleAutocomplete() {
  return (
    <Autocomplete
      options={[]}
      renderInput={() => {
        return <input />;
      }}
    />
  );
}
