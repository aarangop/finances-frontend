import { ThemeContextType, ThemeModeContext } from "@/context/ThemeModeContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import ThemeModeProvider from "./ThemeModeProvider";

describe("ThemeProviderWrapper", () => {
  it("should render children", () => {
    render(
      <ThemeModeProvider>
        <div data-testid="child">Child</div>
      </ThemeModeProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should toggle mode between dark and light", async () => {
    const TestComponent = () => {
      const { mode, toggleMode } = useContext(
        ThemeModeContext
      ) as ThemeContextType;
      return (
        <div>
          <span data-testid="mode">{mode}</span>
          <button onClick={toggleMode}>Toggle Mode</button>
        </div>
      );
    };

    render(
      <ThemeModeProvider defaultMode="light">
        <TestComponent />
      </ThemeModeProvider>
    );

    const modeElement = screen.getByTestId("mode");
    const toggleButton = screen.getByText("Toggle Mode");

    expect(modeElement).toHaveTextContent("light");

    await userEvent.click(toggleButton);
    expect(modeElement).toHaveTextContent("dark");

    await userEvent.click(toggleButton);
    expect(modeElement).toHaveTextContent("light");
  });
});
