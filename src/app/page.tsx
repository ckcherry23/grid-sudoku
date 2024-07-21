import { getFirstSudokuId } from "@/utils/supabase/sudokuApi";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(`sudoku/${await getFirstSudokuId()}`);
}
