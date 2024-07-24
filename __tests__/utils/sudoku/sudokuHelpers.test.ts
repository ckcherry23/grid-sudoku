import { describe, it, expect } from "vitest";
import {
  parseSudoku,
  isValidMove,
  computeCellState,
  isSolved,
} from "@/utils/sudoku/sudokuHelpers";
import {
  FillType,
  HighlightType,
  BorderType,
  Cell,
  SudokuGrid,
} from "@/types/types";

const exampleSudokuString =
  "634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872";
const exampleGrid: SudokuGrid = [
  [6, 3, 4, null, 2, 8, null, 1, 5],
  [null, null, null, 4, 5, 6, 2, 8, 3],
  [5, 2, 8, null, 1, 3, null, 6, null],
  [4, 5, null, 3, 9, 7, 1, 2, 8],
  [2, 1, 3, 8, 6, 5, null, 4, null],
  [8, null, null, 1, 4, null, 5, null, 6],
  [null, 6, null, 5, 8, null, null, 9, 1],
  [3, 8, 1, 2, 7, 9, 6, 5, 4],
  [9, 4, 5, 6, 3, 1, 8, 7, 2],
];

describe("parseSudoku", () => {
  it("should parse a sudoku string into a 9x9 grid", () => {
    const grid = parseSudoku(exampleSudokuString);

    expect(grid).toHaveLength(9);
    grid.forEach((row) => {
      expect(row).toHaveLength(9);
    });
    expect(grid[0][0]).toBe(6);
    expect(grid[0][1]).toBe(3);
    expect(grid[0][2]).toBe(4);
    expect(grid[0][3]).toBeNull();
  });
});

describe("isValidMove", () => {
  it("should return true for a valid move", () => {
    const move: Cell = { row: 0, col: 3, value: 9 };
    expect(isValidMove(exampleGrid, move)).toBe(true);
  });

  it("should return false for a move that conflicts with a value in the same row", () => {
    const move: Cell = { row: 0, col: 4, value: 3 };
    expect(isValidMove(exampleGrid, move)).toBe(false);
  });

  it("should return false for a move that conflicts with a value in the same column", () => {
    const move: Cell = { row: 4, col: 0, value: 6 };
    expect(isValidMove(exampleGrid, move)).toBe(false);
  });

  it("should return false for a move that conflicts with a value in the same 3x3 box", () => {
    const move: Cell = { row: 1, col: 1, value: 4 };
    expect(isValidMove(exampleGrid, move)).toBe(false);
  });
});

describe("computeCellState", () => {
  it("should compute cell state for a valid move", () => {
    const initialGrid = exampleGrid;
    const cellState = computeCellState(exampleGrid, initialGrid, 0, 0, null);

    expect(cellState.fillType).toBe(FillType.INITIAL);
    expect(cellState.highlightType).toBe(HighlightType.NONE);
    expect(cellState.borderTypes).toContain(BorderType.TOP_LEFT_CORNER);
    expect(cellState.borderTypes).toContain(BorderType.TOP_EDGE);
    expect(cellState.borderTypes).toContain(BorderType.LEFT_EDGE);
  });

  it("should highlight selected cell correctly", () => {
    const selectedCell: Cell = { row: 0, col: 0, value: 6 };
    const cellState = computeCellState(
      exampleGrid,
      exampleGrid,
      0,
      0,
      selectedCell,
    );

    expect(cellState.highlightType).toBe(HighlightType.SELECTED);
  });

  it("should highlight cells in the same row, column, or 3x3 box", () => {
    const selectedCell: Cell = { row: 0, col: 4, value: 3 };
    const cellState = computeCellState(
      exampleGrid,
      exampleGrid,
      0,
      3,
      selectedCell,
    );

    expect(cellState.highlightType).toBe(HighlightType.SAME_GROUP);
  });

  it("should highlight cells with the same value and same row, column, or 3x3 box as conflict", () => {
    const selectedCell: Cell = { row: 0, col: 4, value: 8 };
    const cellState = computeCellState(
      exampleGrid,
      exampleGrid,
      0,
      5,
      selectedCell,
    );

    expect(cellState.highlightType).toBe(HighlightType.SAME_VALUE_CONFLICT);
  });

  it("should highlight cells with the same value and different row, column, or 3x3 box as same value", () => {
    const selectedCell: Cell = { row: 0, col: 3, value: 9 };
    const cellState = computeCellState(
      exampleGrid,
      exampleGrid,
      8,
      0,
      selectedCell,
    );

    expect(cellState.highlightType).toBe(HighlightType.SAME_VALUE);
  });

  it("should compute border types correctly", () => {
    const cellState = computeCellState(exampleGrid, exampleGrid, 8, 8, null);

    expect(cellState.borderTypes).toContain(BorderType.BOTTOM_RIGHT_CORNER);
    expect(cellState.borderTypes).toContain(BorderType.BOTTOM_EDGE);
    expect(cellState.borderTypes).toContain(BorderType.RIGHT_EDGE);
  });
});

describe("isSolved", () => {
  it("should return true for a solved Sudoku grid", () => {
    const solvedGrid = parseSudoku(
      "634928715197456283528713469456397128213865947879142536762584391381279654945631872",
    );
    expect(isSolved(solvedGrid)).toBe(true);
  });

  it("should return false for an unsolved Sudoku grid", () => {
    const unsolvedGrid = parseSudoku(
      "634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872",
    );
    expect(isSolved(unsolvedGrid)).toBe(false);
  });

  it("should return false for a grid with duplicates in a row", () => {
    const grid = parseSudoku(
      "111111111222222222333333333444444444555555555666666666777777777888888888999999999",
    );
    expect(isSolved(grid)).toBe(false);
  });

  it("should return false for a grid with duplicates in a column", () => {
    const grid = parseSudoku(
      "123456789123456789123456789123456789123456789123456789123456789123456789123456789",
    );
    expect(isSolved(grid)).toBe(false);
  });

  it("should return false for a grid with duplicates in a 3x3 box", () => {
    const grid = parseSudoku(
      "111222333444555666777888999111222333444555666777888999111222333444555666777888999",
    );
    expect(isSolved(grid)).toBe(false);
  });
});
