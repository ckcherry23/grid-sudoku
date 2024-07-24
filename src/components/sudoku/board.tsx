import CellBox from "./cellBox";

import type {
  Cell,
  CellState,
  GridCoordinate,
  SudokuGrid,
} from "@/types/types";

type BoardProps = {
  getCellState: (row: GridCoordinate, col: GridCoordinate) => CellState;
  grid: SudokuGrid;
  setSelectedCell: (cell: Cell | null) => void;
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
          <CellBox
            key={`${rowIndex}, ${colIndex}`} // eslint-disable-line react/no-array-index-key
            cellState={getCellState(
              rowIndex as GridCoordinate,
              colIndex as GridCoordinate,
            )}
            title={`Cell ${rowIndex}, ${colIndex}`}
            value={cell}
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
