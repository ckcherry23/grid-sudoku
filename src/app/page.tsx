import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import Heading from "../components/ui/heading";
import { Button } from "../components/ui/button";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex w-full max-w-[540px] justify-between">
        <Heading level="heading3" tag="h3">
          Sudoku
        </Heading>
        <div className="flex gap-x-3">
          <Button
            variant="outline"
            className="group gap-x-2 text-red-500 rounded-[18px] hover:text-red-600"
          >
            <ReloadIcon className="stroke-[0.5px] fill-red-500 stroke-red-500 group-hover:fill-red-600 w-5 h-5" />
            Reset
          </Button>
          <Button className="rounded-[18px] gap-x-2">
            Next
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
