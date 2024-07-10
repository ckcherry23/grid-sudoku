export type SudokuGrid = Array<Array<PossibleValue | null>>;

export type PossibleValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = {
  col: PossibleValue;
  row: PossibleValue;
  value: PossibleValue | null;
};

export type Move = Cell;

export enum FillType {
  INITIAL = "INITIAL",
  INVALID = "INVALID",
  VALID = "VALID",
}

export enum HighlightType {
  NONE = "NONE",
  SAME_GROUP = "SAME_GROUP",
  SAME_VALUE = "SAME_VALUE",
  SAME_VALUE_CONFLICT = "SAME_VALUE_CONFLICT",
  SELECTED = "SELECTED",
}

export type CellState = {
  fillType: FillType;
  highlightType: HighlightType;
};
