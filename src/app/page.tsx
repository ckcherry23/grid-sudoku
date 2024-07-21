import { redirect } from "next/navigation";

import { getFirstSudokuId } from "@/utils/supabase/sudokuApi";

export default async function Home() {
  redirect(`sudoku/${await getFirstSudokuId()}`);
}
