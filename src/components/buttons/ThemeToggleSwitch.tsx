"use client";

import { useThemeModeContext } from "@/context/ThemeModeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";

export default function ThemeToggleSwitch() {
  const { mode, toggleMode: setMode } = useThemeModeContext();
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  return (
    <IconButton onClick={setMode}>
      {mode === "light" ? (
        <DarkMode data-testid="DarkModeIcon" />
      ) : (
        <LightMode data-testid="LightModeIcon" />
      )}
    </IconButton>
  );
}
