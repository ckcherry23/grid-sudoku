import { useState } from "react";

import type { Command } from "@/utils/sudoku/sudokuCommands";
import { CellChangeCommand } from "@/utils/sudoku/sudokuCommands";
import { computeCellState, parseSudoku } from "@/utils/sudoku/sudokuHelpers";

import type {
  Cell,
  CellState,
  GridCoordinate,
  PossibleValue,
} from "@/types/types";

const useSudoku = (id: string, sudokuString: string) => {
  const initialGrid = parseSudoku(sudokuString);
  const [grid, setGrid] = useState(initialGrid);

  const commandStack: Array<Command> = [];
  let undoStack: Array<Command> = [];

  const executeCommand = (command: Command) => {
    command.execute();
    commandStack.push(command);
    setGrid([...grid]);
    undoStack = [];
  };

  const undo = () => {
    const command = commandStack.pop();

    if (command) {
      command.undo();
      undoStack.push(command);
      setGrid([...grid]);
    }
  };

  const redo = () => {
    const command = undoStack.pop();

    if (command) {
      command.execute();
      commandStack.push(command);
      setGrid([...grid]);
    }
  };

  const handleCellChange = (
    row: GridCoordinate,
    col: GridCoordinate,
    value: PossibleValue,
  ) => {
    const command = new CellChangeCommand(grid, initialGrid, row, col, value);

    executeCommand(command);
  };

  const isEditable = (row: GridCoordinate, col: GridCoordinate): boolean => {
    return initialGrid[row][col] === null;
  };

  const getCellState = (
    row: GridCoordinate,
    col: GridCoordinate,
    selectedCell: Cell | null,
  ): CellState => {
    return computeCellState(grid, initialGrid, row, col, selectedCell);
  };

  return { getCellState, grid, handleCellChange, id, isEditable, redo, undo };
};

export default useSudoku;
