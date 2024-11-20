"use client";

import { useThemeModeContext } from "@/context/ThemeModeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ThemeToggleSwitch() {
  const { mode, toggleMode: setMode } = useThemeModeContext();
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
