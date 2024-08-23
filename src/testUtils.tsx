import Providers from "@/components/providers/Providers";
import { render, RenderOptions } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactElement } from "react";

const mockRouter = {
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

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(
    <AppRouterContext.Provider value={mockRouter}>
      <Providers children={ui} />
    </AppRouterContext.Provider>
  );

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override render method with our custom one
export { customRender as render };
