import { PaletteMode } from "@mui/material";
import { createContext, useContext } from "react";

type ThemeContextType = {
  mode: PaletteMode | undefined;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
