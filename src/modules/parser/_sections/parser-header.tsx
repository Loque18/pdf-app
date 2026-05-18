"use client";

import { useParserContext } from "../parser.context";

export function ParserHeaderSection() {
  const { requests, maxFilesPerRequest } = useParserContext();

  return (
    <header className="mb-6 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(24,24,27,0.08)]">
      <div className="flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-blue-700">
            PDF Table Parser
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Review parse requests, track PDF jobs, and inspect every extracted
            table.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
            Each parse request accepts up to 10 PDFs. Every PDF becomes one job,
            and each job can return multiple tables that stay grouped in the
            results panel.
          </p>
        </div>

        <div className="w-full max-w-md rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-900">Workspace Summary</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs text-zinc-500">Total requests</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950">
                {requests.length}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs text-zinc-500">Files per request</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950">
                {maxFilesPerRequest}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Create new requests from the first column, then inspect PDF jobs and
            extracted tables from left to right.
          </p>
        </div>
      </div>
    </header>
  );
}
