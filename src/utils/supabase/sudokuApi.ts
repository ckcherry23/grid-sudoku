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

  return data;
}
