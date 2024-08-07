import { render, screen } from "@testing-library/react";
import Providers from "@/components/providers/Providers";
import { useThemeContext } from "../Context";

test("it applies the correct theme based on context", () => {
  const { mode } = useThemeContext();

  render(
    <Providers>
      <div>Test content</div>
    </Providers>
  );

  const testContent = screen.getByText("Test content");

  if (mode === "light") {
    expect(testContent).toHaveStyle("background-color: #fff");
  } else {
    expect(testContent).toHaveStyle("background-color: #000");
  }
});
