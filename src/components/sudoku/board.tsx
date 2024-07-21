import BoardCell from "./boardCell";

import type {
  Cell,
  CellState,
  GridCoordinate,
  PossibleValue,
  SudokuGrid,
} from "@/types/types";

type BoardProps = {
  grid: SudokuGrid;
  setSelectedCell: (cell: Cell | null) => void;
  getCellState: (row: GridCoordinate, col: GridCoordinate) => CellState;
};

export default function Board({
  grid,
  setSelectedCell,
  getCellState,
}: BoardProps) {
  return (
    <div className="grid grid-cols-9 mt-3 rounded-[17px] border border-gray-400 overflow-clip">
      {[...grid].map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <BoardCell
            key={`${rowIndex}, ${colIndex}`} // eslint-disable-line react/no-array-index-key
            value={cell}
            cellState={getCellState(
              rowIndex as GridCoordinate,
              colIndex as GridCoordinate,
            )}
            onClick={() =>
              setSelectedCell({
                col: colIndex as GridCoordinate,
                row: rowIndex as GridCoordinate,
                value: cell,
              })
            }
          />
        )),
      )}
    </div>
  );
}
