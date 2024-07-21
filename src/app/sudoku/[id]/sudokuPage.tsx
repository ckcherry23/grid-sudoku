"use client";

import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import useSudoku from "@/hooks/useSudoku";

import Board from "@/components/sudoku/board";
import ValuePicker from "@/components/sudoku/valuePicker";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import type { Cell } from "@/types/types";

type SudokuPageProps = {
  id: string;
  nextId: string | null;
  sudokuString: string;
};

export default function SudokuPage({
  id,
  sudokuString,
  nextId,
}: SudokuPageProps) {
  const { grid, getCellState, handleCellChange, isEditable } = useSudoku(
    id,
    sudokuString,
  );
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full max-w-[540px] mt-20 mx-20">
        <div className="flex w-full justify-between">
          <Heading level="heading3" tag="h3">
            Sudoku
          </Heading>
          <div className="flex gap-x-3">
            <Button
              className="gap-x-2 text-red-500 rounded-[18px] hover:text-red-500"
              variant="outline"
            >
              <ReloadIcon className="stroke-[0.5px] fill-red-500 stroke-red-500  w-5 h-5" />
              Reset
            </Button>
            {nextId && (
              <Link href={`${nextId}`}>
                <Button className="stroke-[0.5px] stroke-white rounded-[18px] gap-x-2">
                  Next
                  <ArrowRightIcon className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
        <Board
          getCellState={(r, c) => getCellState(r, c, selectedCell)}
          grid={grid}
          setSelectedCell={setSelectedCell}
        />
        {selectedCell && (
          <ValuePicker
            isDisabled={!isEditable(selectedCell.row, selectedCell.col)}
            setValue={(val) => {
              handleCellChange(selectedCell.row, selectedCell.col, val);
              setSelectedCell({ ...selectedCell, value: val });
            }}
            value={selectedCell.value}
          />
        )}
      </div>
    </div>
  );
}
