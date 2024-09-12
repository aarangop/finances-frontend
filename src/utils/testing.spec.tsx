import { useApi, useOpenApiClient } from "@/hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import { screen } from "@testing-library/react";
import { makeQueryClient } from "./queryClient";
import { mockRouter, render, renderHook } from "./testing";

describe("customRender", () => {
  it("should provide the QueryClient context", () => {
    const TestComponent = () => {
      // This should throw an error if not wrapped inside providers
      useQueryClient();
      return <div>Test Component with Providers</div>;
    };

    render(<TestComponent />);

    // Check if the component with providers is rendered
    expect(
      screen.getByText("Test Component with Providers")
    ).toBeInTheDocument();
  });

  it("should provide the OpenApiClient context", () => {
    const TestComponent = () => {
      // This should throw an error if not wrapped inside providers
      useOpenApiClient();
      return <div>Test Component with Providers</div>;
    };

    render(<TestComponent />);

    // Check if the component with providers is rendered
    expect(
      screen.getByText("Test Component with Providers")
    ).toBeInTheDocument();
  });

  it("should mock the Next.js router", () => {
    const TestComponent = () => <div>Test Component</div>;

    render(<TestComponent />);

    // Check if the router was mocked correctly
    expect(mockRouter.push).toBeDefined();
    expect(mockRouter.pathname).toBe("/");
  });
});

describe("customRenderHook", () => {
  it("should render a hook within OpenApiClientProvider and QueryClientProvider", () => {
    // Example: Assuming useOpenApiClient is a hook that depends on OpenApiClientProvider
    const { result } = renderHook(() => useOpenApiClient());

    // Assert that the hook does not throw and is initialized correctly
    expect(result.current).toBeDefined();
  });

  it("should provide necessary contexts to the hook", () => {
    // Example: Assuming useQueryClient is a hook that uses QueryClient
    const { result } = renderHook(() => useApi());

    // Check if the hook has access to the context it needs
    expect(result.current).toBeDefined(); // Adjust this based on hook's behavior
  });

  it("should allow custom query client", () => {
    const queryClient = makeQueryClient();
    const { result } = renderHook(() => useQueryClient(), {
      queryClient,
    });
    expect(result.current).toBe(queryClient);
  });

  it("should allow custom open api client", () => {
    const openApiClient = { GET: jest.fn() } as any;
    const { result } = renderHook(() => useOpenApiClient(), {
      openApiClient,
    });
    expect(result.current).toBe(openApiClient);
  });
});
