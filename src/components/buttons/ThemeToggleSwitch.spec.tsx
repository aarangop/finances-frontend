import ThemeToggleSwitch from "@/components/buttons/ThemeToggleSwitch";
import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "../providers/Providers";

test("it toggles between light and dark modes", () => {
  render(
    <Providers>
      <ThemeToggleSwitch />
    </Providers>
  );

  const button = screen.getByRole("button");

  // Initially, the button should show the DarkMode icon.
  expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();

  // Click the button to toggle the theme.
  fireEvent.click(button);

  // Now, the button should show the LightMode icon.
  expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
});
