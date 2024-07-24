import { createClient } from "@/utils/supabase/server";

export async function getFirstSudokuId() {
  const client = createClient();
  const { data, error } = await client
    .from("sudoku_puzzles")
    .select("id")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error(error); // eslint-disable-line no-console

    return null;
  }

  return data?.id ?? null;
}

export async function getSudokuById(id: string) {
  const client = createClient();
  const { data, error } = await client
    .from("sudoku_puzzles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error); // eslint-disable-line no-console

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
