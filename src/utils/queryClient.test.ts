import { QueryClient } from "@tanstack/react-query";
import { getQueryClient, makeQueryClient } from "./queryClient";

const mockIsServer = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  get isServer() {
    return mockIsServer();
  },
}));

describe("getQueryClient", () => {
  beforeEach(() => {
    // Reset the browserQueryClient before each test
    jest.clearAllMocks();
  });

  it("should create a queryClient on the server", () => {
    // Mock the server environment
    mockIsServer.mockReturnValue(true);
    const client = getQueryClient();
    expect(client).toBeInstanceOf(QueryClient);
  });

  it("should return different instances of the query client when running on the server", () => {
    mockIsServer.mockReturnValue(true);
    const firstQueryClient = getQueryClient();
    const secondQueryClient = getQueryClient();

    // Each call should return a new instance of QueryClient
    expect(firstQueryClient).toBeInstanceOf(QueryClient);
    expect(secondQueryClient).toBeInstanceOf(QueryClient);
    expect(firstQueryClient).not.toBe(secondQueryClient);
  });

  it("should set return the same instance of the query client when running on the browser", () => {
    mockIsServer.mockReturnValue(false);
    const client1 = getQueryClient();
    const client2 = getQueryClient();
    expect(client1).toEqual(client2);
  });
});

describe("makeQueryClient", () => {
  it("should return a QueryClient with the correct default options", () => {
    const queryClient = makeQueryClient();

    expect(queryClient).toBeInstanceOf(QueryClient);
    expect(queryClient.getDefaultOptions().queries?.staleTime).toBe(60 * 1000); // 60 seconds
  });
});
