import { render } from "@/utils/testing";
import { screen } from "@testing-library/react";
import NewTripButton from "./NewTripButton";

describe("NewTripButton", () => {
  it("renders a button", () => {
    render(<NewTripButton />);
  });
  test("trip type menu is initially closed", () => {
    render(<NewTripButton />);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("opens trip type menu when button is clicked", () => {
    // render(<NewTripButton />);
    // screen.getByRole("button").click();
    // expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
