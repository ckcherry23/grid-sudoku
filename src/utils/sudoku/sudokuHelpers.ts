import { SudokuGrid, PossibleValue, Move } from "@/types/types";

export const parseSudoku = (sudokuString: string): SudokuGrid => {
  let grid: SudokuGrid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = sudokuString
      .slice(i * 9, (i + 1) * 9)
      .split("")
      .map((char) => (char === "." ? null : (parseInt(char) as PossibleValue)));
  }
  return grid;
};

export const isValidMove = (sudokuGrid: SudokuGrid, move: Move): boolean => {
  // Check if value is valid for row and column
  for (let i = 0; i < 9; i++) {
    if (
      sudokuGrid[move.row][i] === move.value ||
      sudokuGrid[i][move.col] === move.value
    ) {
      return false;
    }
  }

  // Check if value is valid for 3x3 square
  let startRow = Math.floor(move.row / 3) * 3;
  let startCol = Math.floor(move.col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (sudokuGrid[i][j] === move.value) {
        return false;
      }
    }
  }

  return true;
};
