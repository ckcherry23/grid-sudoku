import type { CellState } from "@/types/types";
import {
  type Cell,
  FillType,
  HighlightType,
  type Move,
  type PossibleValue,
  type SudokuGrid,
} from "@/types/types";

export const parseSudoku = (sudokuString: string): SudokuGrid => {
  const grid: SudokuGrid = [];

  for (let i = 0; i < 9; i++) {
    grid[i] = sudokuString
      .slice(i * 9, (i + 1) * 9)
      .split("")
      .map((char) =>
        char === "." ? null : (parseInt(char, 10) as PossibleValue),
      );
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
  const startRow = Math.floor(move.row / 3) * 3;
  const startCol = Math.floor(move.col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (sudokuGrid[i][j] === move.value) {
        return false;
      }
    }
  }

  return true;
};

export function computeCellState(
  grid: SudokuGrid,
  initialGrid: SudokuGrid,
  row: PossibleValue,
  col: PossibleValue,
  selectedCell: Cell,
): CellState {
  let fillType = FillType.VALID;
  let highlightType = HighlightType.NONE;
  const cell = grid[row][col];
  const initialCell = initialGrid[row][col];

  computeFillType();
  computeHighlightType();

  return {
    fillType,
    highlightType,
  };

  function computeFillType() {
    if (initialCell !== null) {
      fillType = FillType.INITIAL;
    } else if (isValidMove(grid, { col, row, value: cell })) {
      fillType = FillType.VALID;
    } else {
      fillType = FillType.INVALID;
    }
  }

  function computeHighlightType() {
    if (selectedCell.row === row && selectedCell.col === col) {
      highlightType = HighlightType.SELECTED;
    } else if (
      selectedCell.row === row || // Same row
      selectedCell.col === col || // Same column
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && // Same 3x3 square
        Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
    ) {
      if (selectedCell.value === cell) {
        highlightType = HighlightType.SAME_VALUE_CONFLICT;
      } else {
        highlightType = HighlightType.SAME_GROUP;
      }
    } else if (selectedCell.value === cell) {
      highlightType = HighlightType.SAME_VALUE;
    } else {
      highlightType = HighlightType.NONE;
    }
  }
}
