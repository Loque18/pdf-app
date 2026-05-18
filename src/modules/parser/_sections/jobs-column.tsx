"use client";

import { formatDate } from "@lib/utils";
import { Tag } from "@ui/elements";
import { useParserContext } from "../parser.context";
import { getStatusTone } from "../_utils/status-tone";

export function JobsColumnSection() {
  const { state, fn } = useParserContext();

  const selectedRequest = state.selectedRequest;
  const selectedJobId = state.selectedJobId;
  const jobs = selectedRequest?.jobs ?? [];

  return (
    <div className="flex min-h-[720px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-lg font-semibold text-zinc-950">Files</p>
      </div>

      {/* request details */}
      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600">
        {selectedRequest ? (
          <div className="space-y-1">
            <p>
              Request status:{" "}
              <span className="font-medium text-zinc-900">
                {getStatusTone(selectedRequest.status).label}
              </span>
            </p>
            <p>Created: {formatDate(selectedRequest.created_at)}</p>
            <p>Expires: {formatDate(selectedRequest.expires_at)}</p>
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
                onClick={() => fn.selectJob(job.id)}
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
                      {job.file.original_name}
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
                  <span>{formatDate(job.created_at)}</span>
                  <span>{job.output?.payload?.length ?? 0} result blocks</span>
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
  );
}
