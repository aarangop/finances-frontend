"use client";

import { getQueryClient } from "@/api/queryClient";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "dayjs/locale/es";
import { ReactNode, useMemo, useState } from "react";
import { ThemeContext, useThemeContext } from "../Context";

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const toggleMode = () =>
    setMode((previousMode) => (previousMode === "dark" ? "light" : "dark"));

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function UnthemedProviders({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const { mode } = useThemeContext();
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
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderWrapper>
      <UnthemedProviders>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          {children}
        </LocalizationProvider>
      </UnthemedProviders>
    </ThemeProviderWrapper>
  );
}
