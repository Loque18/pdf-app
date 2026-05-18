"use client";

import { useId } from "react";
import { useParserContext } from "../parser.context";
import { Input } from "@ui/elements";

export function ParserHeaderSection() {
  const inputId = useId();
  const { requests, uploadMessage, maxFilesPerRequest, handleFilesChange } =
    useParserContext();

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
          <label
            htmlFor={inputId}
            className="mb-3 block text-sm font-semibold text-zinc-900"
          >
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
            <span>Maximum {maxFilesPerRequest} PDFs per request</span>
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
  );
}
