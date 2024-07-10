import BoardCell from "./boardCell";

import type { Cell, PossibleValue, SudokuGrid } from "@/types/types";

type BoardProps = {
  grid: SudokuGrid;
  setSelectedCell: (cell: Cell | null) => void;
};

export default function Board({ grid, setSelectedCell }: BoardProps) {
  return (
    <div className="grid grid-cols-9 mt-3">
      {[...grid].map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <BoardCell
            key={`${rowIndex}, ${colIndex}`} // eslint-disable-line react/no-array-index-key
            value={cell}
            onClick={() =>
              setSelectedCell({
                col: (colIndex + 1) as PossibleValue,
                row: (rowIndex + 1) as PossibleValue,
                value: cell,
              })
            }
          />
        )),
      )}
    </div>
  );
}
