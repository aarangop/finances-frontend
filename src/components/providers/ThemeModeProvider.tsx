"use client";

import { ThemeModeContext } from "@/context/ThemeModeContext";
import { PaletteMode } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";

export default function ThemeModeProvider({
  children,
  defaultMode = "dark",
}: {
  children: ReactNode;
  defaultMode?: PaletteMode;
}) {
  const [mode, setMode] = useState<PaletteMode>(defaultMode);
  const toggleMode = () => {
    setMode((previousMode) => (previousMode === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);
  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
