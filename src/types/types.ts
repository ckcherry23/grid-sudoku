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
  BOTTOM_EDGE = "bottomEdge",
  BOTTOM_LEFT_CORNER = "bottomLeftCorner",
  BOTTOM_RIGHT_CORNER = "bottomRightCorner",
  DEFAULT = "default",
  LEFT_EDGE = "leftEdge",
  RIGHT_EDGE = "rightEdge",
  TOP_EDGE = "topEdge",
  TOP_LEFT_CORNER = "topLeftCorner",
  TOP_RIGHT_CORNER = "topRightCorner",
}

export type CellState = {
  borderTypes: Array<BorderType>;
  fillType: FillType;
  highlightType: HighlightType;
};
