"use client";

import { Tag } from "@ui/elements";
import { ResultsTable } from "@modules/parser/_components/results-table";
import { useParserContext } from "@modules/parser/parser.context";
import { getStatusTone } from "@modules/parser/_utils/status-tone";
import { filterTablePayload } from "@lib/typing/validate-table";

export function ResultsColumnSection() {
  const { state } = useParserContext();
  const { selectedJob } = state;
  const tables = filterTablePayload(selectedJob?.output?.payload?.tables ?? []);

  return (
    <div className="flex min-h-[720px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-lg font-semibold text-zinc-950">Results</p>
        <p className="mt-1 text-sm text-zinc-500">
          Extracted tables for the selected PDF job.
        </p>
      </div>

      {selectedJob ? (
        <>
          <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-base font-semibold text-zinc-900">
                  {selectedJob.file.original_name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Tag
                  variant={{
                    color: getStatusTone(selectedJob.status).color,
                    size: "24",
                  }}
                >
                  {getStatusTone(selectedJob.status).label}
                </Tag>
                <Tag variant={{ color: "neutral", size: "24" }}>
                  {tables.length} tables
                </Tag>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {tables.length > 0 ? (
              <div className="space-y-4">
                {tables.map((table, index) => (
                  <ResultsTable
                    key={`${selectedJob.id}-${index}`}
                    index={index}
                    table={table}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center rounded-[24px] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                <div>
                  <p className="text-base font-semibold text-zinc-900">
                    No extracted tables yet
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                    This job has not produced table output yet. Once parsing
                    finishes, every extracted table for this PDF will appear
                    here.
                  </p>
                  {/* {selectedJob.errorMessage ? (
                    <p className="mt-3 text-sm text-red-600">
                      {selectedJob.errorMessage}
                    </p>
                  ) : null} */}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-zinc-500">
          Select a PDF job to inspect its results.
        </div>
      )}
    </div>
  );
}
