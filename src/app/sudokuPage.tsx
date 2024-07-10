"use client";

import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import useSudoku from "@/hooks/useSudoku";

export default async function SudokuPage() {
  const { id, grid, handleCellChange } = useSudoku(
    "1",
    "293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5",
  );

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full max-w-[540px] m-20">
        <div className="flex w-full justify-between">
          <Heading level="heading3" tag="h3">
            Sudoku {id}
          </Heading>
          <div className="flex gap-x-3">
            <Button
              variant="outline"
              className="gap-x-2 text-red-500 rounded-[18px] hover:text-red-500"
            >
              <ReloadIcon className="stroke-[0.5px] fill-red-500 stroke-red-500  w-5 h-5" />
              Reset
            </Button>
            <Button className="stroke-[0.5px] stroke-white rounded-[18px] gap-x-2">
              Next
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
