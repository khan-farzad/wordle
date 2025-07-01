import Cell from "./Cell";
type RowProps = {
  row: number;
  activeRow: number;
  activeCol: number;
  guesses: string[];
};

const Row = ({ row, activeCol, activeRow, guesses }: RowProps) => {
  return (
    <div className="grid grid-cols-5 max-w-[400px] gap-2">
      {Array.from({ length: 5 }).map((c, id) => (
        <Cell
          key={id}
          row={row}
          col={id}
          guesses={guesses}
          activeRow={activeRow}
          activeCol={activeCol}
        />
      ))}
    </div>
  );
};

export default Row;
