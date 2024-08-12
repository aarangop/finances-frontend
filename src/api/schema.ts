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
    "/categories/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Category */
        post: operations["create_category_categories__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/categories/{category_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Category */
        get: operations["read_category_categories__category_id__get"];
        put?: never;
        post?: never;
        /** Delete Category */
        delete: operations["delete_category_categories__category_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/expenses/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Expenses */
        get: operations["read_expenses_expenses__get"];
        put?: never;
        /** Create Expense */
        post: operations["create_expense_expenses__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/expenses/{expense_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Expense */
        get: operations["read_expense_expenses__expense_id__get"];
        /** Update Expense */
        put: operations["update_expense_expenses__expense_id__put"];
        post?: never;
        /** Delete Expense */
        delete: operations["delete_expense_expenses__expense_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** CategoryCreateSchema */
        CategoryCreateSchema: {
            /**
             * Name
             * @description The name of the category
             */
            name: string;
        };
        /** CategorySchema */
        CategorySchema: {
            /**
             * Name
             * @description The name of the category
             */
            name: string;
            /** Id */
            id: number;
        };
        /** ExpenseCreateSchema */
        ExpenseCreateSchema: {
            /**
             * Description
             * @description A brief description of the expense
             */
            description: string;
            /**
             * Amount
             * @description The amount of money spent
             */
            amount: number;
            /**
             * Currency
             * @description The currency of the expense
             * @default COP
             */
            currency: string;
            /**
             * Exchange Rate
             * @description The exchange rate of the currency to the base currency
             * @default 1
             */
            exchange_rate: number;
            /**
             * Categories
             * @description A list of category IDs associated with the expense
             */
            categories: components["schemas"]["CategorySchema"][] | null;
        };
        /** ExpenseSchema */
        ExpenseSchema: {
            /**
             * Description
             * @description A brief description of the expense
             */
            description: string;
            /**
             * Amount
             * @description The amount of money spent
             */
            amount: number;
            /**
             * Currency
             * @description The currency of the expense
             * @default COP
             */
            currency: string;
            /**
             * Exchange Rate
             * @description The exchange rate of the currency to the base currency
             * @default 1
             */
            exchange_rate: number;
            /**
             * Categories
             * @default []
             */
            categories: components["schemas"]["CategorySchema"][];
            /** Id */
            id: number;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** TripCreateSchema */
        TripCreateSchema: {
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
        };
        /** TripSchema */
        TripSchema: {
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
            /** Id */
            id: number;
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
        /** VehicleCreateSchema */
        VehicleCreateSchema: {
            /** Name */
            name: string;
            /** Make */
            make: string;
            /** Model */
            model: string;
            /** Year */
            year: number;
            /** Odometer */
            odometer: number;
            /** License Plate */
            license_plate: string;
            /** Color */
            color?: string;
            /** @default car */
            vehicle_type: components["schemas"]["VehicleType"];
        };
        /** VehicleSchema */
        VehicleSchema: {
            /** Name */
            name: string;
            /** Make */
            make: string;
            /** Model */
            model: string;
            /** Year */
            year: number;
            /** Odometer */
            odometer: number;
            /** License Plate */
            license_plate: string;
            /** Color */
            color?: string;
            /** @default car */
            vehicle_type: components["schemas"]["VehicleType"];
            /** Id */
            id: number;
        };
        /**
         * VehicleType
         * @enum {string}
         */
        VehicleType: "car" | "motorcycle" | "truck";
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
                    "application/json": components["schemas"]["VehicleSchema"][];
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
                "application/json": components["schemas"]["VehicleCreateSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VehicleSchema"];
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
                    "application/json": components["schemas"]["VehicleSchema"];
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
                "application/json": components["schemas"]["VehicleSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VehicleSchema"];
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
                    "application/json": components["schemas"]["TripSchema"][];
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
                "application/json": components["schemas"]["TripCreateSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TripSchema"];
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
                    "application/json": components["schemas"]["TripSchema"];
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
                "application/json": components["schemas"]["TripCreateSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TripSchema"];
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
    create_category_categories__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CategoryCreateSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategorySchema"];
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
    read_category_categories__category_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                category_id: number;
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
                    "application/json": components["schemas"]["CategorySchema"];
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
    delete_category_categories__category_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                category_id: number;
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
                    "application/json": components["schemas"]["CategorySchema"];
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
    read_expenses_expenses__get: {
        parameters: {
            query?: never;
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
                    "application/json": components["schemas"]["ExpenseSchema"][];
                };
            };
        };
    };
    create_expense_expenses__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpenseCreateSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ExpenseSchema"];
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
    read_expense_expenses__expense_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                expense_id: number;
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
                    "application/json": components["schemas"]["ExpenseSchema"];
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
    update_expense_expenses__expense_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpenseSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ExpenseSchema"];
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
    delete_expense_expenses__expense_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                expense_id: number;
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
                    "application/json": unknown;
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
}
