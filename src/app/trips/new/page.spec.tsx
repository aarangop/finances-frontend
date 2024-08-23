import { render } from "@/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import NewTripPage from "./page";

describe("NewTripPage", () => {
  it("renders the trip type select dropdown", () => {
    render(<NewTripPage />);
    const tripTypeSelect = screen.getByLabelText("Trip Type");
    expect(tripTypeSelect).toBeInTheDocument();
  });

  test("Next button is disabled when no trip type is selected", () => {
    render(<NewTripPage />);
    const nextButton = screen.getByText(/enter trip details/i);
    expect(nextButton).toBeDisabled();
  });

  test("Next button is enabled when a trip type is selected", () => {
    render(<NewTripPage />);
    const tripTypeSelect = screen.getByLabelText("Trip Type");
    const nextButton = screen.getByText(/enter trip details/i);
    fireEvent.mouseDown(tripTypeSelect); // Open dropdown
    const carOption = screen.getByTestId("trip-type-car-option");

    fireEvent.click(carOption);

    expect(nextButton).toBeEnabled();
  });
});
