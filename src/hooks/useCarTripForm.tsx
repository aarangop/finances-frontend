import { components } from "@/api/schema";
import { useCallback } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type CarTrip = components["schemas"]["CarTripSchema-Input"];
type Vehicle = components["schemas"]["VehicleSchema"];

interface UseCarTripFormParams {
  setValue: UseFormSetValue<CarTrip>;
  watch: UseFormWatch<CarTrip>;
}

export function useCarTripForm({ setValue, watch }: UseCarTripFormParams) {
  const [odometerStart, odometerEnd] = watch([
    "odometer_start",
    "odometer_end",
  ]);

  const handleVehicleSelect = useCallback(
    (vehicle: Vehicle) => {
      setValue("odometer_start", vehicle.odometer);
      setValue("odometer_end", vehicle.odometer + 100);
      handleOdometerChange();
    },
    [setValue]
  );

  const handleOdometerChange = useCallback(() => {
    if (odometerStart && odometerEnd && odometerEnd >= odometerStart) {
      setValue("distance", odometerEnd - odometerStart);
    } else {
      setValue("distance", 0);
    }
  }, [odometerStart, odometerEnd]);

  return { handleVehicleSelect, handleOdometerChange };
}
