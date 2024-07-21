"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type SudokuProgress = {
  currentSudoku: number;
  sudokus: Array<string>;
};

type SudokuContextType = Readonly<{
  setSudokuProgress: (sudokuProgress: SudokuProgress) => void;
  sudokuProgress: SudokuProgress;
}>;

export const defaultSudokuProgress: SudokuProgress = {
  currentSudoku: 0,
  sudokus: [],
};

const SudokuContext = createContext<SudokuContextType>({
  setSudokuProgress: () => {},
  sudokuProgress: defaultSudokuProgress,
});

export function useSudokuContext() {
  return useContext(SudokuContext);
}

type Props = PropsWithChildren;

export default function SudokuProvider({ children }: Props) {
  const [sudokuProgress, setSudokuProgress] = useState<SudokuProgress>(
    defaultSudokuProgress,
  );

  return (
    <SudokuContext.Provider
      value={{
        setSudokuProgress,
        sudokuProgress,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}
