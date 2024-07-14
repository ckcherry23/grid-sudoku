import type { PossibleValue, SudokuGrid } from "@/types/types";

export class Command {
  execute() {}
  undo() {}
}

export class CellChangeCommand extends Command {
  grid: SudokuGrid;
  initialGrid: SudokuGrid;
  row: PossibleValue;
  col: PossibleValue;
  value: PossibleValue | null;
  previousValue: PossibleValue | null;

  constructor(
    grid: SudokuGrid,
    initialGrid: SudokuGrid,
    row: PossibleValue,
    col: PossibleValue,
    value: PossibleValue | null,
  ) {
    super();
    this.grid = grid;
    this.initialGrid = initialGrid;
    this.row = row;
    this.col = col;
    this.value = value;
    this.previousValue = grid[row - 1][col - 1];
  }

  execute() {
    if (this.initialGrid[this.row - 1][this.col - 1] === null) {
      this.grid[this.row - 1][this.col - 1] = this.value;
    }
  }

  undo() {
    this.grid[this.row - 1][this.col - 1] = this.previousValue;
  }
}
