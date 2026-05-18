"use client";

import { useId, useState, type ChangeEvent } from "react";
import { Button, Input, Tag } from "@ui/elements";

type TableData = {
  header: string[];
  rows: string[][];
};

type ParseResultFile = {
  originalName: string;
  url: string;
  key: string;
};

type ParseJob = {
  id: string;
  status: "processed" | "queued" | "processing" | "failed";
  createdAt: string;
  file: ParseResultFile;
  tables: TableData[];
  errorMessage?: string | null;
};

type ParseRequest = {
  id: string;
  status: "processed" | "queued" | "processing" | "failed";
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  errorMessage: string | null;
  jobs: ParseJob[];
};

const MAX_FILES_PER_REQUEST = 10;

const initialRequests: ParseRequest[] = [
  {
    id: "ac44302b-7af0-47f5-90c7-c70819a067d6",
    status: "processed",
    createdAt: "2026-05-18T16:56:19.113935+00:00",
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    jobs: [
      {
        id: "job-6",
        status: "processed",
        createdAt: "2026-05-18T16:56:19.113935+00:00",
        file: {
          originalName: "tax_doc.pdf",
          url: "uploads/parse_requests/463b9da1-1c7e-4e24-8958-cfb448a57f7f/38dd95e7-a295-41a2-99ff-c89cb97acad4.pdf",
          key: "parse_requests/463b9da1-1c7e-4e24-8958-cfb448a57f7f/38dd95e7-a295-41a2-99ff-c89cb97acad4.pdf",
        },
        tables: [
          {
            header: [
              "Invoice ID",
              "Customer",
              "Amount",
              "Tax Rate",
              "Tax Amount",
              "Total",
            ],
            rows: [
              [
                "INV-1001",
                "Acme Corp",
                "$1,200.00",
                "19%",
                "$228.00",
                "$1,428.00",
              ],
              [
                "INV-1002",
                "Nova Systems",
                "$850.00",
                "19%",
                "$161.50",
                "$1,011.50",
              ],
              [
                "INV-1003",
                "Pixel Retail",
                "$430.00",
                "5%",
                "$21.50",
                "$451.50",
              ],
              [
                "INV-1004",
                "Global Imports",
                "$2,100.00",
                "19%",
                "$399.00",
                "$2,499.00",
              ],
              [
                "INV-1005",
                "Luna Foods",
                "$675.00",
                "0%",
                "$0.00",
                "$675.00",
              ],
            ],
          },
          {
            header: ["Metric", "Value"],
            rows: [
              ["Total Revenue", "$5,255.00"],
              ["Total Tax Collected", "$810.00"],
              ["Net Amount", "$6,065.00"],
            ],
          },
        ],
        errorMessage: null,
      },
    ],
  },
  {
    id: "f0f31d10-c395-4a59-bb65-1fb790fb7ea8",
    status: "processing",
    createdAt: "2026-05-18T15:21:08.000000+00:00",
    startedAt: "2026-05-18T15:21:14.000000+00:00",
    finishedAt: null,
    errorMessage: null,
    jobs: [
      {
        id: "job-7",
        status: "processing",
        createdAt: "2026-05-18T15:21:08.000000+00:00",
        file: {
          originalName: "bank_statement.pdf",
          url: "uploads/parse_requests/bank_statement.pdf",
          key: "parse_requests/bank_statement.pdf",
        },
        tables: [],
        errorMessage: null,
      },
      {
        id: "job-8",
        status: "queued",
        createdAt: "2026-05-18T15:21:08.000000+00:00",
        file: {
          originalName: "expenses_q2.pdf",
          url: "uploads/parse_requests/expenses_q2.pdf",
          key: "parse_requests/expenses_q2.pdf",
        },
        tables: [],
        errorMessage: null,
      },
    ],
  },
];

function formatDate(value: string | null) {
  if (!value) {
    return "Not started";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusTone(status: ParseRequest["status"] | ParseJob["status"]) {
  if (status === "processed") {
    return { color: "green" as const, label: "Processed" };
  }

  if (status === "processing") {
    return { color: "blue" as const, label: "Processing" };
  }

  if (status === "failed") {
    return { color: "neutral" as const, label: "Failed" };
  }

  return { color: "neutral" as const, label: "Queued" };
}

function createRequestFromFiles(files: File[]): ParseRequest {
  const now = new Date().toISOString();
  const requestId = crypto.randomUUID();

  return {
    id: requestId,
    status: "queued",
    createdAt: now,
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    jobs: files.map((file) => ({
      id: crypto.randomUUID(),
      status: "queued",
      createdAt: now,
      file: {
        originalName: file.name,
        url: "",
        key: `${requestId}/${file.name}`,
      },
      tables: [],
      errorMessage: null,
    })),
  };
}

function ResultsTable({
  index,
  table,
}: {
  index: number;
  table: TableData;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Table {index + 1}</p>
          <p className="text-xs text-zinc-500">
            {table.rows.length} rows · {table.header.length} columns
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
              <tr key={`${index}-${rowIndex}`} className="odd:bg-white even:bg-zinc-50/70">
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

export function ParserTemplate() {
  const inputId = useId();
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(initialRequests[0]?.id ?? "");
  const [selectedJobId, setSelectedJobId] = useState(initialRequests[0]?.jobs[0]?.id ?? "");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const selectedRequest =
    requests.find((request) => request.id === selectedRequestId) ?? requests[0] ?? null;

  const jobs = selectedRequest?.jobs ?? [];

  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null;

  function handleSelectRequest(requestId: string) {
    setSelectedRequestId(requestId);

    const request = requests.find((entry) => entry.id === requestId);
    setSelectedJobId(request?.jobs[0]?.id ?? "");
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if (!fileList || fileList.length === 0) {
      return;
    }

    const files = Array.from(fileList);

    if (files.length > MAX_FILES_PER_REQUEST) {
      setUploadMessage(
        `Only the first ${MAX_FILES_PER_REQUEST} PDFs were added to this parse request.`,
      );
    } else {
      setUploadMessage(`${files.length} PDF${files.length > 1 ? "s" : ""} queued in a new request.`);
    }

    const pdfFiles = files
      .filter((file) => file.type === "application/pdf" || file.name.endsWith(".pdf"))
      .slice(0, MAX_FILES_PER_REQUEST);

    if (pdfFiles.length === 0) {
      setUploadMessage("No valid PDF files were selected.");
      event.target.value = "";
      return;
    }

    const nextRequest = createRequestFromFiles(pdfFiles);

    setRequests((current) => [nextRequest, ...current]);
    setSelectedRequestId(nextRequest.id);
    setSelectedJobId(nextRequest.jobs[0]?.id ?? "");
    event.target.value = "";
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fafaf9_0%,#f4f4f5_100%)] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(24,24,27,0.08)]">
          <div className="flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-blue-700">
                PDF Table Parser
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Review parse requests, track PDF jobs, and inspect every extracted table.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                Each parse request accepts up to 10 PDFs. Every PDF becomes one job, and each job
                can return multiple tables that stay grouped in the results panel.
              </p>
            </div>

            <div className="w-full max-w-md rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
              <label htmlFor={inputId} className="mb-3 block text-sm font-semibold text-zinc-900">
                New parse request
              </label>
              <Input
                id={inputId}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                onChange={handleFilesChange}
                className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <span>Maximum 10 PDFs per request</span>
                <span>{requests.length} total requests</span>
              </div>
              {uploadMessage ? (
                <p className="mt-3 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-700">
                  {uploadMessage}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-4 lg:grid-cols-[320px_360px_minmax(0,1fr)]">
          <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <p className="text-lg font-semibold text-zinc-950">Parse Requests</p>
              <p className="mt-1 text-sm text-zinc-500">Uploads grouped by request ID and lifecycle.</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {requests.map((request) => {
                const tone = getStatusTone(request.status);
                const isActive = request.id === selectedRequestId;

                return (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => handleSelectRequest(request.id)}
                    className={[
                      "w-full rounded-2xl border p-4 text-left transition-colors",
                      isActive
                        ? "border-blue-300 bg-blue-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900">{request.id}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Created {formatDate(request.createdAt)}
                        </p>
                      </div>
                      <Tag variant={{ color: tone.color, size: "24" }}>{tone.label}</Tag>
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
                          {request.jobs.reduce((count, job) => count + job.tables.length, 0)}
                        </strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <p className="text-lg font-semibold text-zinc-950">Jobs</p>
              <p className="mt-1 text-sm text-zinc-500">Each PDF in the selected request becomes one job.</p>
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
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {jobs.length > 0 ? (
                jobs.map((job) => {
                  const tone = getStatusTone(job.status);
                  const isActive = job.id === selectedJobId;

                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setSelectedJobId(job.id)}
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
                          <p className="mt-1 text-xs text-zinc-500">Job ID {job.id}</p>
                        </div>
                        <Tag variant={{ color: tone.color, size: "24" }}>{tone.label}</Tag>
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
            </div>
          </div>

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
                      <p className="mt-1 break-all text-xs text-zinc-500">{selectedJob.file.key}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag variant={{ color: getStatusTone(selectedJob.status).color, size: "24" }}>
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
                        <ResultsTable key={`${selectedJob.id}-${index}`} index={index} table={table} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center rounded-[24px] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                      <div>
                        <p className="text-base font-semibold text-zinc-900">No extracted tables yet</p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                          This job has not produced table output yet. Once parsing finishes, every
                          extracted table for this PDF will appear here.
                        </p>
                        {selectedJob.errorMessage ? (
                          <p className="mt-3 text-sm text-red-600">{selectedJob.errorMessage}</p>
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

        <footer className="mt-4 flex flex-col gap-3 rounded-[24px] border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Template only. Hook your parser API into request creation and job updates next.</p>
          <Button variant={{ color: "ghost", size: "40" }}>Connect parser service</Button>
        </footer>
      </div>
    </main>
  );
}
