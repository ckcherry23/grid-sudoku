import SudokuProvider from "@/providers/sudokuProvider";

export default async function SudokuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SudokuProvider>{children}</SudokuProvider>;
}
