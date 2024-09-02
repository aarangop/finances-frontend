import { render } from "@/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import CarTripForm from "./CarTripForm";

describe("Car Trip Form UI", () => {
  it("Renders empty origin field for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Origin *")).toHaveValue("");
  });

  it("shows origin required error message", () => {
    render(<CarTripForm />);

    expect(screen.queryByText("Origin is required")).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(screen.getByText("Origin is required")).toBeInTheDocument();
    });
  });

  it("shows origin too short error message", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByText("Origin must contain at least two characters")
    ).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(
        screen.getByText("Origin must contain at least two characters")
      ).toBeInTheDocument();
    });
  });

  it("shows destination required error message", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByText("Destination is required")
    ).not.toBeInTheDocument();

    screen.getByRole("button", { name: /save/i }).click();

    waitFor(() => {
      expect(screen.getByText("Destination is required")).toBeInTheDocument();
    });
  });

  test("end date is disabled when start date is not set", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toBeDisabled();
  });

  test("end date is enabled when start date is set", () => {
    render(<CarTripForm />);

    screen.getByLabelText("Start *").focus();
    fireEvent.change(screen.getByLabelText("Start *"), {
      target: { value: "22/08/2024" },
    });

    expect(screen.getByLabelText("End *")).not.toBeDisabled();
  });

  it("Renders empty destination for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Destination *")).toHaveValue("");
  });

  it("renders empty start date for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("Start *")).toHaveValue("");
  });

  it("renders empty end date for new car trip", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toHaveValue("");
  });

  test("end date is initially disabled", () => {
    render(<CarTripForm />);

    expect(screen.getByLabelText("End *")).toBeDisabled();
  });

  it("enables end date when start date is set", () => {
    render(<CarTripForm />);

    screen.getByLabelText("Start *").focus();
    fireEvent.change(screen.getByLabelText("Start *"), {
      target: { value: "22/08/2024" },
    });

    expect(screen.getByLabelText("End *")).not.toBeDisabled();
  });

  it("doesn't render delete button for new car trip", () => {
    render(<CarTripForm />);

    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });
});
