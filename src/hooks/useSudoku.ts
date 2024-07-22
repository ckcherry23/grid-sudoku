import { useState } from "react";

import type { Command } from "@/utils/sudoku/sudokuCommands";
import { CellChangeCommand, ResetCommand } from "@/utils/sudoku/sudokuCommands";
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

  const [commandStack, setCommandStack] = useState<Array<Command>>([]);
  const [undoStack, setUndoStack] = useState<Array<Command>>([]);

  const executeCommand = (command: Command) => {
    command.execute();
    setCommandStack([...commandStack, command]);
    setGrid([...grid]);
    setUndoStack([]);
  };

  const undo = () => {
    const command = commandStack.pop();

    setCommandStack([...commandStack]);

    if (command) {
      command.undo();
      setUndoStack([...undoStack, command]);
      setGrid([...grid]);
    }
  };

  const redo = () => {
    const command = undoStack.pop();

    setUndoStack([...undoStack]);

    if (command) {
      command.execute();
      setCommandStack([...commandStack, command]);
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

  const handleReset = () => {
    const command = new ResetCommand(grid, initialGrid);

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

  return {
    getCellState,
    grid,
    handleCellChange,
    handleReset,
    id,
    isEditable,
    redo,
    undo,
  };
};

export default useSudoku;
