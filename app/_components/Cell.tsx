type CellProps = {
  row: number;
  col: number;
  activeRow: number;
  activeCol: number;
  guesses: string[];
  color: boolean[][];
  correctWord: string;
};

const Cell = ({
  row,
  col,
  color,
  guesses,
  activeRow,
  activeCol,
  correctWord,
}: CellProps) => {
  return (
    <div
      className={`${
        row == activeRow && col == activeCol
          ? "border-black"
          : "border-gray-200"
      } border-2 border-solid ${
        row < activeRow &&
        (color[row][col] && guesses[row].charAt(col) === correctWord.charAt(col)
          ? "bg-green-700"
          : color[row][col] && correctWord.includes(guesses[row].charAt(col))
          ? "bg-yellow-400"
          : "bg-gray-500")
      } size-14 ${
        row < activeRow ? "text-white border-0" : "text-black"
      } font-semibold text-4xl flex-center`}
    >
      {guesses[row].charAt(col)}
    </div>
  );
};

export default Cell;
