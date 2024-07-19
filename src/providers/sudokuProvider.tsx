"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type SudokuProgress = {
  sudokus: Array<string>;
  currentSudoku: number;
};

type SudokuContextType = Readonly<{
  sudokuProgress: SudokuProgress;
  setSudokuProgress: (sudokuProgress: SudokuProgress) => void;
}>;

export const defaultSudokuProgress: SudokuProgress = {
  sudokus: [],
  currentSudoku: 0,
};

const SudokuContext = createContext<SudokuContextType>({
  sudokuProgress: defaultSudokuProgress,
  setSudokuProgress: () => {},
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
        sudokuProgress,
        setSudokuProgress,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}
