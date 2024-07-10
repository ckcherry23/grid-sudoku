export type SudokuGrid = Array<Array<PossibleValue | null>>;

export type PossibleValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Move = {
  row: PossibleValue;
  col: PossibleValue;
  value: PossibleValue | null;
};
