import { renderHook } from "@testing-library/react";
import { useContext } from "react";
import { ThemeModeContext } from "./ThemeModeContext";

describe("ThemeModeContext", () => {
  it("should return dark mode by default", () => {
    // Arrange
    const { result } = renderHook(() => useContext(ThemeModeContext));
    // Assert
    result.current.mode === "dark";
  });

  it("should return toggleMode function", () => {
    // Arrange
    const { result } = renderHook(() => useContext(ThemeModeContext));
    // Assert
    expect(result.current.toggleMode).toBeInstanceOf(Function);
  });
});
