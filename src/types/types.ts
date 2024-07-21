export type SudokuGrid = Array<Array<PossibleValue>>;

export type PossibleValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
export type GridCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Cell = {
  col: GridCoordinate;
  row: GridCoordinate;
  value: PossibleValue;
};

export type Move = Cell;

export enum FillType {
  INITIAL = "initial",
  INVALID = "invalid",
  VALID = "valid",
}

export enum HighlightType {
  NONE = "none",
  SAME_GROUP = "sameGroup",
  SAME_VALUE = "sameValue",
  SAME_VALUE_CONFLICT = "sameValueConflict",
  SELECTED = "selected",
}

export enum BorderType {
  DEFAULT = "default",
  TOP_EDGE = "topEdge",
  RIGHT_EDGE = "rightEdge",
  BOTTOM_EDGE = "bottomEdge",
  LEFT_EDGE = "leftEdge",
  TOP_RIGHT_CORNER = "topRightCorner",
  BOTTOM_RIGHT_CORNER = "bottomRightCorner",
  BOTTOM_LEFT_CORNER = "bottomLeftCorner",
  TOP_LEFT_CORNER = "topLeftCorner",
}

export type CellState = {
  fillType: FillType;
  highlightType: HighlightType;
  borderTypes: Array<BorderType>;
};
