import { mock } from "node:test";
import {
  browserQueryClient,
  getQueryClient,
  makeQueryClient,
} from "../api/queryClient";
import { QueryClient } from "@tanstack/react-query";

describe("getQueryClient", () => {
  it("should return a query client instance", () => {
    const queryClient = getQueryClient();
    expect(queryClient).toBeDefined();
  });
});

// Mock the module '@tanstack/react-query'
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  get isServer() {
    return mockIsServerValueGetter();
  },
}));
const mockIsServerValueGetter = jest.fn();

describe("getQueryClient", () => {
  afterEach(() => {
    jest.resetModules(); // Reset modules after each test
  });
  it("should return a new query client instance when isServer is true", () => {
    const queryClient = getQueryClient();
    expect(queryClient).toBeInstanceOf(QueryClient);
    expect(queryClient).not.toBe(makeQueryClient());
  });

  it("should return the same query client instance when isServer is false", () => {
    mockIsServerValueGetter.mockReturnValue(false);
    const queryClient1 = getQueryClient();
    const queryClient2 = getQueryClient();
    expect(queryClient1).toBeInstanceOf(QueryClient);
    expect(queryClient1).toBe(queryClient2);
  });
  it("should return a new query client instance if browserQueryClient is undefined", () => {
    mockIsServerValueGetter.mockReturnValue(false);
    const queryClient = getQueryClient();
    expect(queryClient).toBeInstanceOf(QueryClient);
    expect(queryClient).toBe(browserQueryClient);
  });
});
