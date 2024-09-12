"use client";

import getOpenApiClient from "@/utils/openApiClient";
import { getQueryClient } from "@/utils/queryClient";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "dayjs/locale/es";
import { SnackbarProvider } from "notistack";
import { ReactNode, useMemo } from "react";
import { useThemeModeContext } from "../../context/ThemeModeContext";
import DrawerControlsStateProvider from "./DrawerControlsStateProvider";
import DrawerStateProvider from "./DrawerStateProvider";
import OpenApiClientProvider from "./OpenApiClientProvider";
import ThemeModeProvider from "./ThemeModeProvider";

function UnthemedProviders({ children }: { children: ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const queryClient = getQueryClient();
  const openApiClient = getOpenApiClient({ baseUrl });

  const { mode } = useThemeModeContext();
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <OpenApiClientProvider client={openApiClient}>
          <SnackbarProvider maxSnack={3}>
            <DrawerControlsStateProvider>
              <DrawerStateProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  {children}
                </LocalizationProvider>
              </DrawerStateProvider>
            </DrawerControlsStateProvider>
          </SnackbarProvider>
        </OpenApiClientProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeModeProvider>
      <UnthemedProviders>{children}</UnthemedProviders>
    </ThemeModeProvider>
  );
}
