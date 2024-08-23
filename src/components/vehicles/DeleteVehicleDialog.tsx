import client from "@/api/apiClient";
import { getQueryClient } from "@/api/queryClient";
import { components } from "@/api/schema";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Vehicle = components["schemas"]["VehicleSchema"];

export default function DeleteVehicleDialog({
  vehicle,
  open = false,
  handleDialogClose,
}: {
  vehicle: Vehicle;
  open: boolean;
  handleDialogClose: () => void;
}) {
  const queryClient = getQueryClient();
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: (data: Vehicle) => {
      return client.DELETE("/vehicles/{vehicle_id}", {
        params: { path: { vehicle_id: vehicle.id } },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      router.push("/vehicles");
    },
  });

  const deleteVehicle = () => {
    deleteMutation.mutate(vehicle);
    handleDialogClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete '${vehicle.name}'?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button
          onClick={deleteVehicle}
          startIcon={<DeleteIcon />}
          color="error"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
