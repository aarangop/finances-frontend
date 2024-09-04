"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useThemeContext } from "../context/themeContext";

export default function ThemeToggleSwitch() {
  const { mode, toggleMode: setMode } = useThemeContext();
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
