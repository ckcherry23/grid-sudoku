import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { cn } from "@/utils/cn";

import type { PossibleValue } from "@/types/types";

type ValuePickerProps = {
  isDisabled: boolean;
  setValue: (value: PossibleValue) => void;
  value: PossibleValue;
};

export default function ValuePicker({
  value,
  setValue,
  isDisabled = false,
}: ValuePickerProps) {
  return (
    <div className="flex gap-3 items-center justify-center mt-10">
      <div className="flex gap-3">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
          <Button
            key={val}
            className={cn(
              "text-base font-medium rounded-full",
              isDisabled &&
                "bg-gray-300 text-gray-400 hover:bg-gray-300 hover:text-gray-400",
            )}
            size="icon"
            variant={val === value ? "default" : "secondary"}
            {...(!isDisabled
              ? { onClick: () => setValue(val as PossibleValue) }
              : {})}
          >
            {val}
          </Button>
        ))}
      </div>
      <Button
        className={cn(
          "text-base font-medium rounded-full gap-x-2",
          (isDisabled || !value) &&
            "bg-gray-300 text-gray-400 hover:bg-gray-300 hover:text-gray-400",
        )}
        variant="secondary"
        {...(!isDisabled ? { onClick: () => setValue(null) } : {})}
      >
        <CrossCircledIcon className="w-5 h-5" />
        Erase
      </Button>
    </div>
  );
}
