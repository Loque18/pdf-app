import type { TableData } from "../parser.service";

type ResultsTableProps = {
  index: number;
  table: TableData;
};

export function ResultsTable({ index, table }: ResultsTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Table {index + 1}</p>
          <p className="text-xs text-zinc-500">
            {table.rows.length} rows / {table.header.length} columns
          </p>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-zinc-50">
            <tr>
              {table.header.map((cell) => (
                <th
                  key={cell}
                  className="border-b border-zinc-200 px-4 py-3 font-semibold text-zinc-700"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={`${index}-${rowIndex}`}
                className="odd:bg-white even:bg-zinc-50/70"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${index}-${rowIndex}-${cellIndex}`}
                    className="border-b border-zinc-100 px-4 py-3 text-zinc-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
