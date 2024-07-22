import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import type { CellState } from "@/types/types";
import { type PossibleValue } from "@/types/types";

type CellBoxProps = {
  cellState: CellState;
  onClick: () => void;
  value: PossibleValue;
};

const cellBoxVariants = cva(
  "max-w-[60px] h-[60px] flex items-center justify-center text-center text-3xl font-bold bg-background hover:bg-sky-200 rounded-none",
  {
    defaultVariants: {
      fill: "initial",
      highlight: "none",
    },
    variants: {
      fill: {
        initial: "text-black",
        invalid: "text-red-500",
        valid: "text-sky-700",
      },
      highlight: {
        none: "",
        sameGroup: "bg-sky-50",
        sameValue: "bg-sky-100",
        sameValueConflict: "bg-red-100",
        selected: "bg-sky-200",
      },
    },
  },
);

const borderStyles = {
  bottomEdge: "border-b border-b-gray-400",
  bottomLeftCorner: "rounded-bl-2xl",
  bottomRightCorner: "rounded-br-2xl",
  default: "border-[0.5px] border-gray-300",
  leftEdge: "border-l border-l-gray-400",
  rightEdge: "border-r border-r-gray-400",
  topEdge: "border-t border-t-gray-400",
  topLeftCorner: "rounded-tl-2xl",
  topRightCorner: "rounded-tr-2xl",
};

export default function CellBox({ value, onClick, cellState }: CellBoxProps) {
  const fill = cellState.fillType;
  const highlight = cellState.highlightType;
  const { borderTypes } = cellState;

  return (
    <button
      className={cn(
        cellBoxVariants({ fill, highlight }),
        borderTypes.map((b) => borderStyles[b]),
      )}
      type="button"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
