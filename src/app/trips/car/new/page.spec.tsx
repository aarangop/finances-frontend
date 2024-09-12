import { render } from "@/utils/testing";
import { screen } from "@testing-library/react";
import NewCarTripPage from "./page";

describe("NewCarTripPage", () => {
  it("renders new car trip form", () => {
    render(<NewCarTripPage />);
    // Assert
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
