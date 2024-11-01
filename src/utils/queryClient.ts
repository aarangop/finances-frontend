import { isServer, QueryClient } from "@tanstack/react-query";

/**
 * Creates and configures a new QueryClient instance with default options.
 * This client is specifically configured for server-side rendering (SSR) scenarios.
 *
 * @returns {QueryClient} A new QueryClient instance with configured default options,
 * including a staleTime of 60 seconds to prevent immediate refetching on the client side.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

export let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns a query client instance, handling both server-side and client-side scenarios.
 *
 * On the server, it always creates a new query client to prevent state leakage between requests.
 * On the browser, it creates a new query client only if one doesn't exist, maintaining a singleton instance.
 *
 * @remarks
 * The singleton pattern on the browser side is crucial for preventing query client recreation
 * during React suspense, which could lead to unnecessary state resets.
 *
 * @returns A QueryClient instance appropriate for the current environment
 */
export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client, otherwise we'd leak state to other requests
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
