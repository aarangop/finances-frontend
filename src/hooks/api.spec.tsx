import { renderHook as renderHookWithProviders } from "@/utils/testing";
import { useApi, useOpenApiClient } from "./api";

describe("useOpenApiClient hook", () => {
  it("should return openApiClient", () => {
    const { result } = renderHookWithProviders(() => useOpenApiClient());
    expect(result.current).toBeDefined();
    expect(result.current).toBeInstanceOf(Object);
    expect(result.current).toHaveProperty("GET");
  });
  it("should throw error if used outside of ApiClientsProvider", () => {
    expect(() => {
      renderHookWithProviders(() => useOpenApiClient());
    }).toThrow("useOpenApiClient must be used within an ApiClientsProvider");
  });
});

describe("useApi hook", () => {
  it("should return openApiClient and queryClient", () => {
    const { result } = renderHookWithProviders(() => useApi());
    expect(result.current.openApiClient).toBeDefined();
    expect(result.current.queryClient).toBeDefined();
  });
  it("should throw error if used outside of ApiClientsProvider", () => {
    expect(() => {
      renderHookWithProviders(() => useApi());
    }).toThrow("useOpenApiClient must be used within an ApiClientsProvider");
  });
});
