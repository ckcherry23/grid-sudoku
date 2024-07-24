"use client";

import { ArrowRightIcon, ReloadIcon, ResetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import useSudoku from "@/hooks/useSudoku";

import CommonAlertDialog from "@/components/common/commonAlertDialog";
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
  const {
    grid,
    getCellState,
    handleCellChange,
    handleReset,
    isCellEditable,
    isSudokuSolved,
    undo,
    redo,
  } = useSudoku(id, sudokuString);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [isSolvedDialogOpen, setIsSolvedDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedCell && isSudokuSolved) {
      setIsSolvedDialogOpen(true);
    } else {
      setIsSolvedDialogOpen(false);
    }
  }, [isSudokuSolved]);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <CommonAlertDialog
        actionText="Continue"
        description="You have solved the Sudoku."
        isOpen={isSolvedDialogOpen}
        setIsOpen={setIsSolvedDialogOpen}
        title="Congratulations!"
      />
      <div className="w-full max-w-[540px] m-4 md:mt-20 md:mx-20">
        <div className="flex w-full justify-between">
          <div className="flex gap-x-4 items-center">
            <Heading level="heading3" tag="h3">
              Sudoku
            </Heading>
            <div className="flex gap-x-1">
              <Button
                size="icon"
                title="Undo"
                variant="outline"
                onClick={() => {
                  undo();
                  setSelectedCell(null);
                }}
              >
                <ResetIcon className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                title="Redo"
                variant="outline"
                onClick={() => {
                  redo();
                  setSelectedCell(null);
                }}
              >
                <ResetIcon className="w-5 h-5 scale-x-[-1]" />
              </Button>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Button
              className="gap-x-2 text-red-500 rounded-[18px] hover:text-red-500"
              title="Reset"
              variant="outline"
              onClick={() => {
                handleReset();
                setSelectedCell(null);
              }}
            >
              <ReloadIcon className="stroke-[0.5px] fill-red-500 stroke-red-500 w-5 h-5" />
              Reset
            </Button>
            {nextId && (
              <Link href={`${nextId}`}>
                <Button
                  className="stroke-[0.5px] stroke-white rounded-[18px] gap-x-2"
                  title="Next"
                >
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
            isDisabled={!isCellEditable(selectedCell.row, selectedCell.col)}
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
