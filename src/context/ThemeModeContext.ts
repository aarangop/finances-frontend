import { PaletteMode } from "@mui/material";
import { createContext, useContext } from "react";

export type ThemeContextType = {
  mode: PaletteMode | undefined;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleMode: () => {},
});

export const useThemeModeContext = () => useContext(ThemeModeContext);
