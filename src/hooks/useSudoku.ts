"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import type { Command } from "@/utils/sudoku/sudokuCommands";
import { CellChangeCommand, ResetCommand } from "@/utils/sudoku/sudokuCommands";
import {
  computeCellState,
  isSolved,
  parseSudoku,
} from "@/utils/sudoku/sudokuHelpers";

import type {
  Cell,
  CellState,
  GridCoordinate,
  PossibleValue,
} from "@/types/types";

const useSudoku = (id: string, sudokuString: string) => {
  const initialGrid = parseSudoku(sudokuString);
  const [grid, setGrid] = useLocalStorage(id, initialGrid, {
    initializeWithValue: false,
  });
  const [isSudokuSolved, setIsSudokuSolved] = useState<boolean>(false);

  const [commandStack, setCommandStack] = useState<Array<Command>>([]);
  const [undoStack, setUndoStack] = useState<Array<Command>>([]);

  useEffect(() => {
    if (isSolved(grid)) {
      setIsSudokuSolved(true);
    } else {
      setIsSudokuSolved(false);
    }
  }, [grid]);

  const executeCommand = (command: Command) => {
    command.execute(grid);
    setCommandStack([...commandStack, command]);
    setGrid([...grid]);
    setUndoStack([]);
  };

  const undo = () => {
    const command = commandStack.pop();

    setCommandStack([...commandStack]);

    if (command) {
      command.undo(grid);
      setUndoStack([...undoStack, command]);
      setGrid([...grid]);
    }
  };

  const redo = () => {
    const command = undoStack.pop();

    setUndoStack([...undoStack]);

    if (command) {
      command.execute(grid);
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

  const isCellEditable = (
    row: GridCoordinate,
    col: GridCoordinate,
  ): boolean => {
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
    isCellEditable,
    isSudokuSolved,
    redo,
    undo,
  };
};

export default useSudoku;
