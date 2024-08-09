/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/vehicles/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Vehicles */
        get: operations["read_vehicles_vehicles__get"];
        put?: never;
        /** Create Vehicle */
        post: operations["create_vehicle_vehicles__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vehicles/{vehicle_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Vehicle */
        get: operations["read_vehicle_vehicles__vehicle_id__get"];
        /** Update Vehicle */
        put: operations["update_vehicle_vehicles__vehicle_id__put"];
        post?: never;
        /** Delete Vehicle */
        delete: operations["delete_vehicle_vehicles__vehicle_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trips/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Trips */
        get: operations["read_trips_trips__get"];
        put?: never;
        /** Create Trip */
        post: operations["create_trip_trips__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trips/{trip_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Trip */
        get: operations["read_trip_trips__trip_id__get"];
        /** Update Trip */
        put: operations["update_trip_trips__trip_id__put"];
        post?: never;
        /** Delete Trip */
        delete: operations["delete_trip_trips__trip_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** Trip */
        Trip: {
            /** From Location */
            from_location: string;
            /** To Location */
            to_location: string;
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /**
             * End Date
             * Format: date
             */
            end_date: string;
            /** Odometer Start */
            odometer_start: number;
            /** Odometer End */
            odometer_end: number;
            /** Vehicle Id */
            vehicle_id: number;
            /** Id */
            id: number;
        };
        /** TripCreate */
        TripCreate: {
            /** From Location */
            from_location: string;
            /** To Location */
            to_location: string;
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /**
             * End Date
             * Format: date
             */
            end_date: string;
            /** Odometer Start */
            odometer_start: number;
            /** Odometer End */
            odometer_end: number;
            /** Vehicle Id */
            vehicle_id: number;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** Vehicle */
        Vehicle: {
            /** Name */
            name: string;
            /** Brand */
            brand: string;
            /** Model */
            model: string;
            /** Year */
            year: number;
            /** Odometer */
            odometer: number;
            /** License Plate */
            license_plate: string;
            /** Color */
            color: string;
            /** Id */
            id: number;
            /**
             * Trips
             * @default []
             */
            trips: components["schemas"]["Trip"][];
        };
        /** VehicleCreate */
        VehicleCreate: {
            /** Name */
            name: string;
            /** Brand */
            brand: string;
            /** Model */
            model: string;
            /** Year */
            year: number;
            /** Odometer */
            odometer: number;
            /** License Plate */
            license_plate: string;
            /** Color */
            color: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    read_vehicles_vehicles__get: {
        parameters: {
            query?: {
                skip?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Vehicle"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_vehicle_vehicles__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VehicleCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Vehicle"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    read_vehicle_vehicles__vehicle_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                vehicle_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Vehicle"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_vehicle_vehicles__vehicle_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                vehicle_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VehicleCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Vehicle"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_vehicle_vehicles__vehicle_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                vehicle_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    read_trips_trips__get: {
        parameters: {
            query?: {
                skip?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Trip"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_trip_trips__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TripCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Trip"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    read_trip_trips__trip_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                trip_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Trip"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_trip_trips__trip_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                trip_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TripCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Trip"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_trip_trips__trip_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                trip_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
