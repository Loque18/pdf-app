"use client";

// lib
import { formatDate } from "@lib/utils";

// components
import { ResultsTable } from "./_components/results-table";

// context
import { useParserContext } from "./parser.context";

// sections
import { ParserFooterSection } from "./_sections/parser-footer";
import { ParserHeaderSection } from "./_sections/parser-header";

// utils
import { getStatusTone } from "./_utils/status-tone";

// ui
import { Tag } from "@ui/elements";

export function ParserTemplate() {
  const {
    requests,
    selectedRequestId,
    selectedRequest,
    selectedJob,
    selectRequest,
  } = useParserContext();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fafaf9_0%,#f4f4f5_100%)] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* header and request upload */}
        <ParserHeaderSection />

        {/* main parser workspace */}
        <section className="grid flex-1 gap-4 lg:grid-cols-[320px_360px_minmax(0,1fr)]">
          {/* parse requests column */}
          <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <p className="text-lg font-semibold text-zinc-950">
                Parse Requests
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Uploads grouped by request ID and lifecycle.
              </p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {requests.map((request) => {
                const tone = getStatusTone(request.status);
                const isActive = request.id === selectedRequestId;

                return (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => selectRequest(request.id)}
                    className={[
                      "w-full rounded-2xl border p-4 text-left transition-colors",
                      isActive
                        ? "border-blue-300 bg-blue-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900">
                          {request.id}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Created {formatDate(request.createdAt)}
                        </p>
                      </div>
                      <Tag variant={{ color: tone.color, size: "24" }}>
                        {tone.label}
                      </Tag>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-500">
                      <div className="rounded-xl bg-zinc-100 px-3 py-2">
                        <span className="block text-zinc-400">PDFs</span>
                        <strong className="text-sm font-semibold text-zinc-900">
                          {request.jobs.length}
                        </strong>
                      </div>
                      <div className="rounded-xl bg-zinc-100 px-3 py-2">
                        <span className="block text-zinc-400">Tables</span>
                        <strong className="text-sm font-semibold text-zinc-900">
                          {request.jobs.reduce(
                            (count, job) => count + job.tables.length,
                            0,
                          )}
                        </strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* jobs column */}
          <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <p className="text-lg font-semibold text-zinc-950">Jobs</p>
              <p className="mt-1 text-sm text-zinc-500">
                Each PDF in the selected request becomes one job.
              </p>
            </div>
            <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600">
              {selectedRequest ? (
                <div className="space-y-1">
                  <p>
                    Request status:{" "}
                    <span className="font-medium text-zinc-900">
                      {getStatusTone(selectedRequest.status).label}
                    </span>
                  </p>
                  <p>Started: {formatDate(selectedRequest.startedAt)}</p>
                  <p>Finished: {formatDate(selectedRequest.finishedAt)}</p>
                </div>
              ) : (
                <p>Select a request to inspect its PDF jobs.</p>
              )}
            </div>
            {/* <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {jobs.length > 0 ? (
                jobs.map((job) => {
                  const tone = getStatusTone(job.status);
                  const isActive = job.id === selectedJobId;

                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => selectJob(job.id)}
                      className={[
                        "w-full rounded-2xl border p-4 text-left transition-colors",
                        isActive
                          ? "border-blue-300 bg-blue-50"
                          : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-zinc-900">
                            {job.file.originalName}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            Job ID {job.id}
                          </p>
                        </div>
                        <Tag variant={{ color: tone.color, size: "24" }}>
                          {tone.label}
                        </Tag>
                      </div>
                      <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2 text-xs text-zinc-500">
                        <span>{formatDate(job.createdAt)}</span>
                        <span>{job.tables.length} tables</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-500">
                  No jobs in this request yet.
                </div>
              )}
            </div> */}
          </div>

          {/* results column */}
          <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
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
                        {selectedJob.file.originalName}
                      </p>
                      <p className="mt-1 break-all text-xs text-zinc-500">
                        {selectedJob.file.key}
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
                        {selectedJob.tables.length} tables
                      </Tag>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {selectedJob.tables.length > 0 ? (
                    <div className="space-y-4">
                      {selectedJob.tables.map((table, index) => (
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
                          This job has not produced table output yet. Once
                          parsing finishes, every extracted table for this PDF
                          will appear here.
                        </p>
                        {selectedJob.errorMessage ? (
                          <p className="mt-3 text-sm text-red-600">
                            {selectedJob.errorMessage}
                          </p>
                        ) : null}
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
        </section>

        {/* footer actions */}
        <ParserFooterSection />
      </div>
    </main>
  );
}
