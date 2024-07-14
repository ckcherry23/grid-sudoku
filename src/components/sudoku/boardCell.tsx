import type { PossibleValue } from "@/types/types";

type BoardCellProps = {
  onClick: () => void;
  value: PossibleValue | null;
};

export default function BoardCell({ value, onClick }: BoardCellProps) {
  return (
    <button
      className="max-w-[60px] h-[60px] flex items-center justify-center text-center text-3xl font-bold border-[0.5px] bg-background hover:bg-accent rounded-none"
      type="button"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
