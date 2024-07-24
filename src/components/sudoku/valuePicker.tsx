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
    <div className="flex gap-3 items-center justify-center mt-4 md:mt-10">
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
          <Button
            key={val}
            className={cn(
              "text-base font-medium rounded-full",
              "disabled:bg-gray-300 disabled:text-gray-400 disabled:opacity-100",
            )}
            disabled={isDisabled}
            size="icon"
            title={`Set value as ${val}`}
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
          "disabled:bg-gray-300 disabled:text-gray-400 disabled:opacity-100",
        )}
        disabled={isDisabled || !value}
        title="Erase"
        variant="secondary"
        {...(!isDisabled ? { onClick: () => setValue(null) } : {})}
      >
        <CrossCircledIcon className="w-5 h-5" />
        Erase
      </Button>
    </div>
  );
}
