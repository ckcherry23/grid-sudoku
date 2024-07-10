import { useState } from "react";

import { parseSudoku } from "@/utils/sudoku/sudokuHelpers";

import type { PossibleValue } from "@/types/types";

const useSudoku = (id: string, sudokuString: string) => {
  const initialGrid = parseSudoku(sudokuString);
  const [grid, setGrid] = useState(initialGrid);

  const handleCellChange = (
    row: number,
    col: number,
    value: PossibleValue | null,
  ) => {
    const newGrid = [...grid];

    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return { grid, handleCellChange, id };
};

export default useSudoku;
