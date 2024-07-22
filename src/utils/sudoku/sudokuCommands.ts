import type { GridCoordinate, PossibleValue, SudokuGrid } from "@/types/types";

export class Command {
  execute(grid: SudokuGrid) {} // eslint-disable-line @typescript-eslint/no-unused-vars
  undo(grid: SudokuGrid) {} // eslint-disable-line @typescript-eslint/no-unused-vars
}

export class CellChangeCommand extends Command {
  grid: SudokuGrid;
  initialGrid: SudokuGrid;
  row: GridCoordinate;
  col: GridCoordinate;
  value: PossibleValue;
  previousValue: PossibleValue;

  constructor(
    grid: SudokuGrid,
    initialGrid: SudokuGrid,
    row: GridCoordinate,
    col: GridCoordinate,
    value: PossibleValue,
  ) {
    super();
    this.grid = grid;
    this.initialGrid = initialGrid;
    this.row = row;
    this.col = col;
    this.value = value;
    this.previousValue = grid[row][col];
  }

  execute(grid: SudokuGrid) {
    if (this.initialGrid[this.row][this.col] === null) {
      grid[this.row][this.col] = this.value;
    }
  }

  undo(grid: SudokuGrid) {
    grid[this.row][this.col] = this.previousValue;
  }
}

export class ResetCommand extends Command {
  grid: SudokuGrid;
  initialGrid: SudokuGrid;
  previousGrid: SudokuGrid;

  constructor(grid: SudokuGrid, initialGrid: SudokuGrid) {
    super();
    this.grid = grid;
    this.initialGrid = initialGrid;
    this.previousGrid = grid.map((row) => row.slice());
  }

  execute(grid: SudokuGrid) {
    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        if (this.initialGrid[rowIndex][colIndex] === null) {
          grid[rowIndex][colIndex] = null;
        }
      });
    });
  }

  undo(grid: SudokuGrid) {
    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        grid[rowIndex][colIndex] = this.previousGrid[rowIndex][colIndex];
      });
    });
  }
}
