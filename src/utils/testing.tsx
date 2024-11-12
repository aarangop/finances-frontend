import OpenApiClientProvider from "@/components/providers/OpenApiClientProvider";
import Providers from "@/components/providers/Providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactElement, ReactNode } from "react";
import getOpenApiClient, { OpenApiClient } from "./openApiClient";
import { makeQueryClient } from "./queryClient";

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  isFallback: false,
  basePath: "",
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  isReady: true,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

/**
 * Renders a React element with custom options.
 *
 * @param ui - The React element to render.
 * @param options - Optional rendering options.
 * @returns The rendered React element.
 */
const customRender = (ui: ReactElement, options?: RenderOptions) => {
  // Always create a new query client for each render, otherwise there might be issues with cached queries

  return render(
    <AppRouterContext.Provider value={mockRouter}>
      <Providers>{ui}</Providers>
    </AppRouterContext.Provider>,
    options
  );
};

export type CustomRenderHookOptions<T> = RenderHookOptions<T> & {
  queryClient?: QueryClient;
  openApiClient?: OpenApiClient;
};

/**
 * A utility function for custom rendering of React hooks in tests.
 *
 * @template TResult - The type of the result returned by the callback function.
 * @template TProps - The type of the props passed to the callback function.
 *
 * @param {Function} callback - The callback function that receives the props and returns the result.
 * @param {CustomRenderHookOptions<TProps>} [options] - Optional options for customizing the rendering.
 *
 * @returns {RenderHookResult<TResult>} - The result of rendering the hook.
 */
/**
 * Custom render hook for testing purposes.
 *
 * This function wraps the provided hook callback with necessary providers
 * such as `OpenApiClientProvider` and `QueryClientProvider` to facilitate
 * testing with context dependencies.
 *
 * @template TResult - The type of the result returned by the hook.
 * @template TProps - The type of the props passed to the hook.
 *
 * @param {function(TProps): TResult} callback - The hook callback to be rendered.
 * @param {CustomRenderHookOptions<TProps>} [options] - Optional configuration for the render hook.
 * @param {QueryClient} [options.queryClient] - An optional instance of QueryClient. If not provided, a new instance will be created.
 * @param {OpenApiClient} [options.openApiClient] - An optional instance of OpenApiClient. If not provided, a new instance will be created using the base URL from environment variables or a default value.
 *
 * @returns {RenderHookResult<TResult, TProps>} The result of the rendered hook.
 */
export const customRenderHook = <TResult, TProps>(
  callback: (props: TProps) => TResult,
  options?: CustomRenderHookOptions<TProps>
) => {
  let { queryClient, openApiClient } = options || {};
  if (!queryClient) {
    queryClient = makeQueryClient();
  }
  if (!openApiClient) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    openApiClient = getOpenApiClient({ baseUrl: baseUrl });
  }
  const wrapper = ({ children }: { children: ReactNode }) => (
    <OpenApiClientProvider client={openApiClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </OpenApiClientProvider>
  );
  return renderHook(callback, { wrapper });
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override render method with our custom one
export { customRender as render, customRenderHook as renderHook };
