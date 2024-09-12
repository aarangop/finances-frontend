import { setupServer } from "msw/node";

export const apiPath = (path: string) =>
  new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`).toString();

const server = setupServer();
export default server;
