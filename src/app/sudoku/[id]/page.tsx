import { getSudokuById } from "@/utils/supabase/sudokuApi";

import SudokuPage from "./sudokuPage";

export default async function Sudoku({ params }: { params: { id: string } }) {
  const sudoku = await getSudokuById(params.id);

  if (!sudoku) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-2xl">Sudoku not found :(</p>
      </div>
    );
  }

  return (
    <SudokuPage
      id={sudoku.id}
      nextId={sudoku.nextId}
      sudokuString={sudoku.puzzle}
    />
  );
}
