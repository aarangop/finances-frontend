import { Button, Card, CardActions, CardHeader } from "@mui/material";
import NextLink from "next/link";

import type { components } from "@/api/schema";

type Vehicle = components["schemas"]["Vehicle"];

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card>
      <CardHeader
        title={vehicle.name}
        subheader={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
      />
      <CardActions>
        <Button
          size="small"
          color="primary"
          LinkComponent={NextLink}
          href={`/vehicles/${vehicle.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
