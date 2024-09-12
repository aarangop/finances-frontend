import createClient, { Client, ClientOptions } from "openapi-fetch";
import { paths } from "../api/schema";

export type OpenApiClient = Client<paths, `${string}/${string}`>;

type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

const getOpenApiClient = (
  clientOptions?: ClientOptions,
  fetch?: Fetch
): OpenApiClient => {
  let options = clientOptions || {};
  if (fetch) {
    options.fetch = fetch;
  }
  return createClient<paths>(options);
};

export default getOpenApiClient;
