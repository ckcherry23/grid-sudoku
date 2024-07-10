export type SudokuGrid = Array<Array<PossibleValue | null>>;

export type PossibleValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = {
  row: PossibleValue;
  col: PossibleValue;
  value: PossibleValue | null;
};

export type Move = Cell;

export enum FillType {
  INITIAL = "INITIAL",
  VALID = "VALID",
  INVALID = "INVALID",
}

export enum HighlightType {
  SELECTED = "SELECTED",
  SAME_GROUP = "SAME_GROUP",
  SAME_VALUE = "SAME_VALUE",
  SAME_VALUE_CONFLICT = "SAME_VALUE_CONFLICT",
}
