"use client";

import { useId, useState, type ChangeEvent } from "react";
import { Button, Input } from "@ui/elements";
import { useParserContext } from "../parser.context";

type DraftPreview = {
  file: File;
};

export function RequestCreateSection() {
  const inputId = useId();
  const { fn, maxFilesPerRequest } = useParserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [drafts, setDrafts] = useState<DraftPreview[]>([]);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    setFeedback(null);
    setDrafts(files.slice(0, maxFilesPerRequest).map((file) => ({ file })));
  }

  function handleToggle() {
    setIsOpen((current) => !current);
    setFeedback(null);
  }

  function handleSubmit() {
    const result = fn.createRequest(drafts.map((draft) => draft.file));

    setFeedback({
      tone: result.ok ? "success" : "error",
      message: result.message,
    });

    if (!result.ok) {
      return;
    }

    setDrafts([]);
    setIsOpen(false);
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-950">New Request</p>
          <p className="text-xs text-zinc-500">
            Upload up to {maxFilesPerRequest} PDFs in one batch.
          </p>
        </div>
        <Button variant={{ color: "blue", size: "32" }} onClick={handleToggle}>
          {isOpen ? "Close" : "Add New"}
        </Button>
      </div>

      {isOpen ? (
        <div className="mt-3 space-y-3">
          <Input
            id={inputId}
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={handleFilesChange}
            className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />

          {drafts.length > 0 ? (
            <div className="grid gap-3">
              {drafts.map((draft) => (
                <article
                  key={`${draft.file.name}-${draft.file.lastModified}`}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <div className="rounded-lg border border-red-200 bg-white px-2 py-1 text-[10px] font-bold tracking-[0.2em]">
                      PDF
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {draft.file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {(draft.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-4 py-6 text-center text-sm text-zinc-500">
              Select one or more PDF files to preview them here.
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">
              {drafts.length} / {maxFilesPerRequest} files selected
            </p>
            <Button
              variant={{ color: "neutral", size: "32" }}
              onClick={handleSubmit}
              disabled={drafts.length === 0}
            >
              Send Request
            </Button>
          </div>

          {feedback ? (
            <p
              className={[
                "rounded-xl px-3 py-2 text-sm",
                feedback.tone === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
