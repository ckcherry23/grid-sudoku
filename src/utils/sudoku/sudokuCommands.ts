import type { GridCoordinate, PossibleValue, SudokuGrid } from "@/types/types";

export class Command {
  execute() {}
  undo() {}
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

  execute() {
    if (this.initialGrid[this.row][this.col] === null) {
      this.grid[this.row][this.col] = this.value;
    }
  }

  undo() {
    this.grid[this.row][this.col] = this.previousValue;
  }
}
