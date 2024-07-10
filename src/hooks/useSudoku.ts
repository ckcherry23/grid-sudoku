import { PossibleValue } from "@/types/types";
import { parseSudoku } from "@/utils/sudoku/sudokuHelpers";
import { useState } from "react";

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

  return { id, grid, handleCellChange };
};

export default useSudoku;
