import { createClient } from "@/utils/supabase/server";

export async function getSudokuIds() {
  const client = createClient();
  const { data, error } = await client
    .from("sudoku_puzzles")
    .select("id")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data.map((sudoku) => sudoku.id);
}

export async function getSudokuById(id: string) {
  const client = createClient();
  const { data, error } = await client
    .from("sudoku_puzzles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  // get id of next puzzle
  const { data: nextSudoku } = await client
    .from("sudoku_puzzles")
    .select("id")
    .gt("id", id)
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (nextSudoku === null) {
    // get id of first puzzle
    const { data: firstSudoku } = await client
      .from("sudoku_puzzles")
      .select("id")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    return {
      ...data,
      nextId: firstSudoku?.id ?? null,
    };
  }

  return {
    ...data,
    nextId: nextSudoku?.id ?? null,
  };
}
