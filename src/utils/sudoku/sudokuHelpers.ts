import { BorderType, CellState, GridCoordinate } from "@/types/types";
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
      (sudokuGrid[move.row][i] === move.value && i !== move.col) ||
      (sudokuGrid[i][move.col] === move.value && i !== move.row)
    ) {
      return false;
    }
  }

  // Check if value is valid for 3x3 square
  const startRow = Math.floor(move.row / 3) * 3;
  const startCol = Math.floor(move.col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (sudokuGrid[i][j] === move.value && i !== move.row && j !== move.col) {
        return false;
      }
    }
  }

  return true;
};

export function computeCellState(
  grid: SudokuGrid,
  initialGrid: SudokuGrid,
  row: GridCoordinate,
  col: GridCoordinate,
  selectedCell: Cell | null,
): CellState {
  let fillType = FillType.VALID;
  let highlightType = HighlightType.NONE;
  let borderTypes: BorderType[] = [];

  const cellValue = grid[row][col];
  const initialCellValue = initialGrid[row][col];

  computeFillType();
  computeHighlightType();
  computeBorderTypes();

  return {
    fillType,
    highlightType,
    borderTypes,
  };

  function computeFillType() {
    if (initialCellValue !== null) {
      fillType = FillType.INITIAL;
    } else if (isValidMove(grid, { col, row, value: cellValue })) {
      fillType = FillType.VALID;
    } else {
      fillType = FillType.INVALID;
    }
  }

  function computeHighlightType() {
    if (selectedCell === null) {
      highlightType = HighlightType.NONE;
      return;
    }

    if (selectedCell.row === row && selectedCell.col === col) {
      highlightType = HighlightType.SELECTED;
    } else if (
      selectedCell.row === row || // Same row
      selectedCell.col === col || // Same column
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && // Same 3x3 square
        Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
    ) {
      if (selectedCell.value === cellValue && selectedCell.value !== null) {
        highlightType = HighlightType.SAME_VALUE_CONFLICT;
      } else {
        highlightType = HighlightType.SAME_GROUP;
      }
    } else if (
      selectedCell.value === cellValue &&
      selectedCell.value !== null
    ) {
      highlightType = HighlightType.SAME_VALUE;
    } else {
      highlightType = HighlightType.NONE;
    }
  }

  type BorderCondition = {
    condition: boolean;
    type: BorderType;
  };

  function computeBorderTypes() {
    borderTypes = [BorderType.DEFAULT];

    const borderConditions: Array<BorderCondition> = [
      { condition: row % 3 === 0, type: BorderType.TOP_EDGE },
      { condition: row % 3 === 2, type: BorderType.BOTTOM_EDGE },
      { condition: col % 3 === 0, type: BorderType.LEFT_EDGE },
      { condition: col % 3 === 2, type: BorderType.RIGHT_EDGE },
      { condition: row === 0 && col === 0, type: BorderType.TOP_LEFT_CORNER },
      { condition: row === 0 && col === 8, type: BorderType.TOP_RIGHT_CORNER },
      {
        condition: row === 8 && col === 0,
        type: BorderType.BOTTOM_LEFT_CORNER,
      },
      {
        condition: row === 8 && col === 8,
        type: BorderType.BOTTOM_RIGHT_CORNER,
      },
    ];

    borderConditions.forEach(({ condition, type }) => {
      if (condition) {
        borderTypes.push(type);
      }
    });
  }
}
