import getOpenApiClient from "@/utils/openApiClient";
import { renderHook } from "@testing-library/react";
import { ReactNode, useContext } from "react";
import OpenApiClientContext from "./OpenApiClientContext";

describe("OpenApiClientContext", () => {
  test("Initial context is null", () => {
    const { result } = renderHook(() => useContext(OpenApiClientContext));
    // Assert
    expect(result.current).toBeNull();
  });

  test("Context is set", () => {
    // Arrange
    const wrapper = ({ children }: { children: ReactNode }) => {
      const openApiClient = getOpenApiClient();
      return (
        <OpenApiClientContext.Provider value={openApiClient}>
          {children}
        </OpenApiClientContext.Provider>
      );
    };
    // Act
    const { result } = renderHook(() => useContext(OpenApiClientContext), {
      wrapper,
    });
    // Assert
    expect(result.current).not.toBeNull();
    expect(result.current).toHaveProperty("GET");
  });
});
