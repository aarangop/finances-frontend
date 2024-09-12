import OpenApiClientContext from "@/context/OpenApiClientContext";
import getOpenApiClient from "@/utils/openApiClient";
import { renderHook } from "@testing-library/react";
import { useContext } from "react";
import OpenApiClientProvider from "./OpenApiClientProvider";

describe("OpenApiClientProvider", () => {
  it("should provide the openApiClient to its children", () => {
    // Arrange: Render the provider
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OpenApiClientProvider client={getOpenApiClient()}>
        {children}
      </OpenApiClientProvider>
    );

    // Act: Render a child component that uses the context
    const { result } = renderHook(() => useContext(OpenApiClientContext), {
      wrapper,
    });

    // Assert: Check that the context value is the openApiClient
    expect(result.current).toHaveProperty("GET");
    expect(result.current).toHaveProperty("POST");
    expect(result.current).toHaveProperty("PUT");
    expect(result.current).toHaveProperty("DELETE");
  });
});
