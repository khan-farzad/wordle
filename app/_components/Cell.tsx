type CellProps = {
  row: number;
  col: number;
  activeRow: number;
  activeCol: number;
  guesses: string[];
};

const Cell = ({ row, col, guesses, activeRow, activeCol }: CellProps) => {
  return (
    <div
      className={`${
        row == activeRow && col == activeCol
          ? "border-black"
          : "border-gray-400"
      } border-2 border-solid size-14 text-black font-semibold text-4xl flex-center`}
    >
      {guesses[row].charAt(col)}
    </div>
  );
};

export default Cell;
