import { CellState, type PossibleValue } from "@/types/types";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

type BoardCellProps = {
  onClick: () => void;
  value: PossibleValue | null;
  cellState: CellState;
};

const boardCellVariants = cva(
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
  default: "border-[0.5px] border-gray-300",
  topEdge: "border-t border-t-gray-400",
  rightEdge: "border-r border-r-gray-400",
  bottomEdge: "border-b border-b-gray-400",
  leftEdge: "border-l border-l-gray-400",
  topRightCorner: "rounded-tr-2xl",
  bottomRightCorner: "rounded-br-2xl",
  bottomLeftCorner: "rounded-bl-2xl",
  topLeftCorner: "rounded-tl-2xl",
};

export default function BoardCell({
  value,
  onClick,
  cellState,
}: BoardCellProps) {
  const fill = cellState.fillType;
  const highlight = cellState.highlightType;
  const borderTypes = cellState.borderTypes;

  return (
    <button
      className={cn(
        boardCellVariants({ fill, highlight }),
        borderTypes.map((b) => borderStyles[b]),
      )}
      type="button"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
