import { components } from "@/api/schema";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockVehicles } from "./vehicle";

type Vehicle = components["schemas"]["VehicleSchema"];

export const apiPath = (path: string) =>
  new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`).toString();

// Default handlers
const handlers = [
  http.get(apiPath("/vehicles"), async () => {
    return HttpResponse.json<Vehicle[]>(mockVehicles);
  }),
];

const server = setupServer(...handlers);
export default server;
