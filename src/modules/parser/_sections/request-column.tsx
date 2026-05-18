"use client";

import { formatDate } from "@lib/utils";
import { Tag } from "@ui/elements";
import { useParserContext } from "../parser.context";
import { RequestCreateSection } from "../_sections/request-create";
import { getStatusTone } from "../_utils/status-tone";

export function RequestColumnSection() {
  const { requests, state, fn } = useParserContext();

  const { parseRequestReq } = requests;

  return (
    <div className="flex min-h-[720px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-lg font-semibold text-zinc-950">Parse Requests</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        <RequestCreateSection />

        {(parseRequestReq.data ?? []).map((request) => {
          const tone = getStatusTone(request.status);
          const isActive = request.id === state.selectedRequestId;

          return (
            <button
              key={request.id}
              type="button"
              onClick={() => fn.selectRequest(request.id)}
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
                    Created {formatDate(request.created_at)}
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
                  {/* <strong className="text-sm font-semibold text-zinc-900">
                    {request.jobs.reduce(
                      (count, job) => count + job.tables.length,
                      0,
                    )}
                  </strong> */}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
