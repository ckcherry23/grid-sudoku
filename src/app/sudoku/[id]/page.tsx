import { getSudokuById } from "@/utils/supabase/sudokuApi";
import SudokuPage from "./sudokuPage";

export default async function Sudoku({ params }: { params: { id: string } }) {
  const sudoku = await getSudokuById(params.id);
  if (!sudoku) {
    return <>Not found</>;
  }

  return (
    <SudokuPage
      id={sudoku.id}
      sudokuString={sudoku.puzzle}
      nextId={sudoku.nextId}
    />
  );
}
