import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import type { PossibleValue } from "@/types/types";

type ValuePickerProps = {
  setValue: (value: PossibleValue | null) => void;
  value: PossibleValue | null;
};

export default function ValuePicker({ value, setValue }: ValuePickerProps) {
  return (
    <div className="flex gap-3 items-center justify-center mt-10">
      <div className="flex gap-3">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
          <Button
            key={val}
            className="text-base font-medium rounded-full"
            size="icon"
            variant={val === value ? "default" : "secondary"}
            onClick={() => setValue(val as PossibleValue)}
          >
            {val}
          </Button>
        ))}
      </div>
      <Button
        className="text-base font-medium rounded-full gap-x-2"
        disabled={!value}
        variant="secondary"
        onClick={() => setValue(null)}
      >
        <CrossCircledIcon className="w-5 h-5" />
        Erase
      </Button>
    </div>
  );
}
