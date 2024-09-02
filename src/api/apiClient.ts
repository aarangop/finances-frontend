import createClient, { Client, ClientOptions } from "openapi-fetch";
import { paths } from "./schema";

let client: Client<paths, `${string}/${string}`> | null = null;

let clientOptions: ClientOptions = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
};

type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

const getClient = (fetch?: Fetch) => {
  if (!client) {
    if (fetch) {
      clientOptions.fetch = fetch;
    }
    client = createClient<paths>(clientOptions);
    return client;
  }
  return client;
};

export default getClient;
