import { describe, it, expect } from "vitest";
import { CellChangeCommand, ResetCommand } from "@/utils/sudoku/sudokuCommands";
import type { PossibleValue, SudokuGrid } from "@/types/types";

const initialGrid: SudokuGrid = [
  [1, 2, 3, null, null, null, null, null, null],
  [null, null, null, 4, 5, 6, null, null, null],
  [null, null, null, null, 7, 8, 9, null, null],
  [null, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
];

describe("CellChangeCommand", () => {
  it("should execute a cell change command correctly", () => {
    const grid: SudokuGrid = initialGrid.map((row) => row.slice());
    const command = new CellChangeCommand(
      grid,
      initialGrid,
      0,
      3,
      9 as PossibleValue,
    );

    expect(grid[0][3]).toBeNull();
    command.execute(grid);
    expect(grid[0][3]).toBe(9);
  });

  it("should undo a cell change command correctly", () => {
    const grid: SudokuGrid = initialGrid.map((row) => row.slice());
    const command = new CellChangeCommand(
      grid,
      initialGrid,
      0,
      3,
      9 as PossibleValue,
    );

    expect(grid[0][3]).toBeNull();
    command.execute(grid);
    expect(grid[0][3]).toBe(9);
    command.undo(grid);
    expect(grid[0][3]).toBeNull();
  });

  it("should not change initial cells when executing", () => {
    const grid: SudokuGrid = initialGrid.map((row) => row.slice());
    const command = new CellChangeCommand(
      grid,
      initialGrid,
      0,
      0,
      9 as PossibleValue,
    );

    expect(grid[0][0]).toBe(1); // Initial value
    command.execute(grid);
    expect(grid[0][0]).toBe(1); // Initial value should remain unchanged
  });
});

describe("ResetCommand", () => {
  it("should execute a reset command correctly", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 4, 5, 6, 9, 9, 9],
      [9, 9, 9, 9, 7, 8, 9, 9, 9],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
    ];
    const command = new ResetCommand(grid, initialGrid);

    command.execute(grid);
    expect(grid).toEqual(initialGrid);
  });

  it("should undo a reset command correctly", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 4, 5, 6, 9, 9, 9],
      [9, 9, 9, 9, 7, 8, 9, 9, 9],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
    ];
    const expectedGrid = [...grid];
    const command = new ResetCommand(grid, initialGrid);

    command.execute(grid);
    expect(grid).toEqual(initialGrid);
    command.undo(grid);
    expect(grid).toEqual(expectedGrid);
  });
});
