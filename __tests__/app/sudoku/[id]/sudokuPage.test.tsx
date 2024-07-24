import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SudokuPage from "@/app/sudoku/[id]/sudokuPage";

const initialProps = {
  id: "1",
  nextId: "2",
  sudokuString:
    "634.28715197456283528713469456397128213865947879142536762584391381279654945631872",
};

describe("SudokuPage", () => {
  it("renders the SudokuPage component correctly", () => {
    render(<SudokuPage {...initialProps} />);
    expect(screen.getByText("Sudoku")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("handles cell selection and value change correctly", () => {
    render(<SudokuPage {...initialProps} />);
    fireEvent.click(screen.getByTitle("Cell 0, 3"));
    expect(screen.getByTitle("Cell 0, 3")).toBeEmptyDOMElement();

    fireEvent.click(screen.getByTitle("Set value as 9"));
    expect(screen.getByTitle("Cell 0, 3")).toHaveTextContent("9");

    fireEvent.click(screen.getByTitle("Erase"));
    expect(screen.getByTitle("Cell 0, 3")).toBeEmptyDOMElement();
  });

  it("handles sudoku reset correctly", () => {
    render(<SudokuPage {...initialProps} />);
    fireEvent.click(screen.getByTitle("Cell 0, 3"));
    fireEvent.click(screen.getByTitle("Set value as 9"));
    expect(screen.getByTitle("Cell 0, 3")).toHaveTextContent("9");

    fireEvent.click(screen.getByTitle("Reset"));
    expect(screen.getByTitle("Cell 0, 3")).toBeEmptyDOMElement();
    expect(screen.getByTitle("Cell 0, 0")).toHaveTextContent("6");
  });

  it("opens the solved dialog when Sudoku is solved", async () => {
    render(<SudokuPage {...initialProps} />);
    fireEvent.click(screen.getByTitle("Cell 0, 3"));
    fireEvent.click(screen.getByTitle("Set value as 9"));

    await waitFor(() => {
      screen.getByText("Congratulations!");
    });

    fireEvent.click(screen.getByTitle("Erase"));
    await waitFor(() => {
      expect(screen.queryByText("Congratulations!")).toBeNull();
    });
  });

  it("handles undo and redo actions correctly", async () => {
    render(<SudokuPage {...initialProps} />);
    fireEvent.click(screen.getByTitle("Cell 0, 3"));
    expect(screen.getByTitle("Cell 0, 3")).toBeEmptyDOMElement();

    fireEvent.click(screen.getByTitle("Set value as 9"));
    fireEvent.click(screen.getByTitle("Set value as 8"));
    fireEvent.click(screen.getByTitle("Reset"));

    fireEvent.click(screen.getByTitle("Undo"));
    await waitFor(() => {
      expect(screen.getByTitle("Cell 0, 3")).toHaveTextContent("8");
    });

    fireEvent.click(screen.getByTitle("Undo"));
    await waitFor(() => {
      expect(screen.getByTitle("Cell 0, 3")).toHaveTextContent("9");
    });

    fireEvent.click(screen.getByTitle("Redo"));
    await waitFor(() => {
      expect(screen.getByTitle("Cell 0, 3")).toHaveTextContent("8");
    });

    fireEvent.click(screen.getByTitle("Redo"));
    await waitFor(() => {
      expect(screen.getByTitle("Cell 0, 3")).toBeEmptyDOMElement();
    });
  });
});
