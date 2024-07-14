import { useState } from "react";

import type { Command } from "@/utils/sudoku/sudokuCommands";
import { CellChangeCommand } from "@/utils/sudoku/sudokuCommands";
import { computeCellState, parseSudoku } from "@/utils/sudoku/sudokuHelpers";

import type { Cell, CellState, PossibleValue } from "@/types/types";

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
    row: PossibleValue,
    col: PossibleValue,
    value: PossibleValue | null,
  ) => {
    const command = new CellChangeCommand(grid, initialGrid, row, col, value);

    executeCommand(command);
  };

  const isEditable = (row: PossibleValue, col: PossibleValue): boolean => {
    return initialGrid[row - 1][col - 1] === null;
  };

  const getCellState = (
    row: PossibleValue,
    col: PossibleValue,
    selectedCell: Cell,
  ): CellState => {
    return computeCellState(grid, initialGrid, row, col, selectedCell);
  };

  return { getCellState, grid, handleCellChange, id, isEditable, redo, undo };
};

export default useSudoku;
