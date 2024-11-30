import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dialog from "./Dialog";

jest.mock("react-portal", () => ({ children }) => <div>{children}</div>);
jest.mock("focus-trap-react", () => ({ children }) => <div>{children}</div>);

describe("Dialog Component", () => {
  const onClose = jest.fn();

  test("does not render dialog when not open", () => {
    render(
      <Dialog isOpen={false} title="Test Dialog" onClose={onClose}>
        <p>Dialog body content</p>
      </Dialog>
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  test("matches snapshot when closed", () => {
    const { asFragment } = render(
      <Dialog isOpen={false} title="Snapshot Test" onClose={onClose}>
        <p>Dialog body content</p>
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
