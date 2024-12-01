import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dialog from "./Dialog";

describe("Dialog Component", () => {
  const onClose = jest.fn();

  test("renders dialog with title and children", () => {
    render(
      <Dialog title="Test Dialog" onClose={onClose}>
        <p> Dialog body content </p>{" "}
      </Dialog>
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog body content")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    render(<Dialog title="Test Dialog" onClose={onClose} />);
    fireEvent.click(screen.getByText("×"));
    expect(onClose).toHaveBeenCalled();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Dialog title="Snapshot Test" onClose={onClose}>
        <p> Dialog body content </p>{" "}
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
