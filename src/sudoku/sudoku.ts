import { SudokuGrid, PossibleValue, Move } from "../types/types";

export class Sudoku {
  id: string;
  sudokuGrid: SudokuGrid;
  initialGrid: SudokuGrid;

  constructor(id: string, sudokuString: string) {
    this.id = id;
    this.initialGrid = this.parseSudoku(sudokuString);
    this.sudokuGrid = this.initialGrid;
  }

  private parseSudoku(sudokuString: string): SudokuGrid {
    let grid: SudokuGrid = [];
    for (let i = 0; i < 9; i++) {
      grid[i] = sudokuString
        .slice(i * 9, (i + 1) * 9)
        .split("")
        .map((char) =>
          char === "." ? null : (parseInt(char) as PossibleValue),
        );
    }
    return grid;
  }

  isValidMove(move: Move): boolean {
    // Check if cell is empty in initial grid
    if (this.initialGrid[move.row][move.col] !== null) {
      return false;
    }

    // Check if value is valid for row and column
    for (let i = 0; i < 9; i++) {
      if (
        this.sudokuGrid[move.row][i] === move.value ||
        this.sudokuGrid[i][move.col] === move.value
      ) {
        return false;
      }
    }

    // Check if value is valid for 3x3 square
    let startRow = Math.floor(move.row / 3) * 3;
    let startCol = Math.floor(move.col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (this.sudokuGrid[i][j] === move.value) {
          return false;
        }
      }
    }

    return true;
  }

  resetPuzzle() {
    this.sudokuGrid = this.initialGrid;
  }
}
