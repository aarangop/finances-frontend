import { components } from "@/api/schema";
import { http, HttpResponse, Path } from "msw";
import { setupServer } from "msw/node";

type CarTrip = components["schemas"]["CarTripSchema-Input"];
type CarTripCreate = components["schemas"]["CarTripCreateSchema"];
type Vehicle = components["schemas"]["VehicleSchema"];

export const apiPath = (path: string) => {
  return new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`).toString();
};

const handlers = [
  http.get<any, Vehicle[], any, Path>(apiPath("/vehicles/"), async () => {
    return HttpResponse.json<Vehicle[]>([
      {
        id: 1,
        name: "Car 1",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        odometer: 0,
        license_plate: "aaa-111",
        vehicle_type: "car",
      },
      {
        id: 2,
        name: "Car 2",
        make: "Honda",
        model: "Civic",
        year: 2019,
        odometer: 0,
        license_plate: "bbb-222",
        vehicle_type: "car",
      },
    ]);
  }),
  http.post<any, CarTripCreate, CarTrip>("/trips/car", async ({ request }) => {
    const trip = await request.json();
    return HttpResponse.json({ ...trip, id: 1 });
  }),
  http.put<any, CarTrip, CarTrip, "/trips/car/:id">(
    "/trips/car/:id",
    async ({ request, params }) => {
      const trip = await request.json();
      return HttpResponse.json({ ...trip, id: params.id });
    }
  ),
];

const server = setupServer(...handlers);
export default server;
