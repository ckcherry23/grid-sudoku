import { PossibleValue } from "@/types/types";
import { Button } from "@/components/ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";

type ValuePickerProps = {
  value: PossibleValue | null;
};

export default function ValuePicker({ value }: ValuePickerProps) {
  return (
    <div className="flex gap-3 items-center justify-center mt-10">
      <div className="flex gap-3">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
          <Button
            variant={val === value ? "default" : "secondary"}
            size="icon"
            key={val}
            className={`text-base font-medium rounded-full`}
            // onClick={() => setValue(val)}
          >
            {val}
          </Button>
        ))}
      </div>
      <Button
        variant={value ? "default" : "secondary"}
        className={`text-base font-medium rounded-full gap-x-2`}
        // onClick={() => setValue(null)}
      >
        <CrossCircledIcon className="w-5 h-5" />
        Erase
      </Button>
    </div>
  );
}
