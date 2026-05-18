"use client";

// third party
import { useState } from "react";

// lib
import { filterTablePayload } from "@lib/typing/validate-table";

// ui
import { Button, Tag } from "@ui/elements";

// self
import { ResultsTable } from "@modules/parser/_components/results-table";
import { useParserContext } from "@modules/parser/parser.context";
import { getStatusTone } from "@modules/parser/_utils/status-tone";

export function ResultsColumnSection() {
  const [activeTab, setActiveTab] = useState<"pdf" | "json" | "html">("pdf");
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
            <div className="space-y-4">
              <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <header className="border-b border-zinc-200 px-4 py-3">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        Preview
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={{
                          color: activeTab === "pdf" ? "blue" : "ghost",
                          size: "32",
                        }}
                        onClick={() => setActiveTab("pdf")}
                        className="w-[150px]"
                      >
                        PDF Preview
                      </Button>
                      <Button
                        variant={{
                          color: activeTab === "json" ? "blue" : "ghost",
                          size: "32",
                        }}
                        onClick={() => setActiveTab("json")}
                        className="w-[150px]"
                      >
                        JSON
                      </Button>
                      <Button
                        variant={{
                          color: activeTab === "html" ? "blue" : "ghost",
                          size: "32",
                        }}
                        onClick={() => setActiveTab("html")}
                        className="w-[150px]"
                      >
                        HTML
                      </Button>
                    </div>
                  </div>
                </header>
                {activeTab === "pdf" ? (
                  <div className="h-[420px] bg-zinc-100">
                    <object
                      data={
                        process.env.NEXT_PUBLIC_API_URL + selectedJob.file.url
                      }
                      type="application/pdf"
                      className="h-full w-full"
                    >
                      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-500">
                        This PDF could not be rendered in the embedded viewer.
                      </div>
                    </object>
                  </div>
                ) : activeTab === "json" ? (
                  <pre className="max-h-[420px] overflow-auto bg-zinc-950 px-4 py-4 text-xs leading-6 text-zinc-100">
                    {JSON.stringify(tables, null, 2)}
                  </pre>
                ) : tables.length > 0 ? (
                  <div className="max-h-[420px] space-y-4 overflow-auto p-4">
                    {tables.map((table, index) => (
                      <ResultsTable
                        key={`${selectedJob.id}-${index}`}
                        index={index}
                        table={table}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[420px] items-center justify-center bg-zinc-50 p-8 text-center">
                    <div>
                      <p className="text-base font-semibold text-zinc-900">
                        No extracted tables yet
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                        This job has not produced table output yet. Once parsing
                        finishes, rendered tables will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>
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
