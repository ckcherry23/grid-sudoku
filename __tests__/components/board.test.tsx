import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Board from "@/components/sudoku/board";
import type {
  BorderType,
  CellState,
  FillType,
  GridCoordinate,
  HighlightType,
  SudokuGrid,
} from "@/types/types";

describe("Board", () => {
  const mockSetSelectedCell = vi.fn();
  const mockGetCellState = vi.fn();

  const grid: SudokuGrid = [
    [1, null, 3, 4, 5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ];

  const cellState: CellState = {
    fillType: "initial" as FillType,
    highlightType: "none" as HighlightType,
    borderTypes: ["default"] as Array<BorderType>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCellState.mockImplementation(() => cellState);
  });

  it("renders correctly with the provided grid", () => {
    render(
      <Board
        grid={grid}
        setSelectedCell={mockSetSelectedCell}
        getCellState={mockGetCellState}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(81); // 9x9 grid should render 81 cells
  });

  it("calls setSelectedCell with correct arguments when a cell is clicked", () => {
    render(
      <Board
        grid={grid}
        setSelectedCell={mockSetSelectedCell}
        getCellState={mockGetCellState}
      />,
    );

    // Select the second cell for testing
    const cellButton = screen.getAllByRole("button")[1];
    fireEvent.click(cellButton);

    expect(mockSetSelectedCell).toHaveBeenCalledWith({
      col: 1 as GridCoordinate,
      row: 0 as GridCoordinate,
      value: null,
    });
  });

  it("calls getCellState with correct arguments for each cell", () => {
    render(
      <Board
        grid={grid}
        setSelectedCell={mockSetSelectedCell}
        getCellState={mockGetCellState}
      />,
    );

    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        expect(mockGetCellState).toHaveBeenCalledWith(
          rowIndex as GridCoordinate,
          colIndex as GridCoordinate,
        );
      });
    });
  });

  it("renders cells with correct values", () => {
    render(
      <Board
        grid={grid}
        setSelectedCell={mockSetSelectedCell}
        getCellState={mockGetCellState}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[1]).toHaveTextContent(""); // Null cell should render as empty
    expect(buttons[2]).toHaveTextContent("3");
  });
});
