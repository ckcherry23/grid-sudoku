import { describe, it, expect, vi, Mock } from "vitest";
import { getFirstSudokuId, getSudokuById } from "@/utils/supabase/sudokuApi";
import { createClient } from "@/utils/supabase/server";

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("getFirstSudokuId", () => {
  it("should return the first sudoku id", async () => {
    const mockClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: "123" },
        error: null,
      }),
    };

    (createClient as Mock).mockReturnValue(mockClient);

    const result = await getFirstSudokuId();
    expect(result).toBe("123");
    expect(mockClient.from).toHaveBeenCalledWith("sudoku_puzzles");
    expect(mockClient.select).toHaveBeenCalledWith("id");
    expect(mockClient.order).toHaveBeenCalledWith("id", { ascending: true });
    expect(mockClient.limit).toHaveBeenCalledWith(1);
    expect(mockClient.single).toHaveBeenCalled();
  });

  it("should return null if there is an error", async () => {
    const mockClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: new Error("Test error"),
      }),
    };
    (createClient as Mock).mockReturnValue(mockClient);

    const result = await getFirstSudokuId();
    expect(result).toBeNull();
  });
});

describe("getSudokuById", () => {
  it("should return the sudoku with next id", async () => {
    const mockClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValueOnce({
          data: { id: "1", puzzle: "puzzle1" },
          error: null,
        })
        .mockResolvedValueOnce({ data: { id: "2" }, error: null }),
      gt: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    };
    (createClient as Mock).mockReturnValue(mockClient);

    const result = await getSudokuById("1");
    expect(result).toEqual({ id: "1", puzzle: "puzzle1", nextId: "2" });
  });

  it("should return the sudoku with the first id if next id is not found", async () => {
    const mockClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValueOnce({
          data: { id: "2", puzzle: "puzzle2" },
          error: null,
        })
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({ data: { id: "1" }, error: null }),
      gt: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    };
    (createClient as Mock).mockReturnValue(mockClient);

    const result = await getSudokuById("2");
    expect(result).toEqual({ id: "2", puzzle: "puzzle2", nextId: "1" });
  });

  it("should return null if there is an error in fetching the sudoku", async () => {
    const mockClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValue({ data: null, error: new Error("Test error") }),
    };
    (createClient as Mock).mockReturnValue(mockClient);

    const result = await getSudokuById("1");
    expect(result).toBeNull();
  });
});
