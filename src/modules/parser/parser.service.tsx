"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import { parserRequestsMock } from "@lib/temp/parser";
import { ParserContext } from "./parser.context";
import { useAnonService } from "@/lib/services/anon-service/anon.context";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";

export type TableData = {
  header: string[];
  rows: string[][];
};

export type ParseResultFile = {
  originalName: string;
  url: string;
  key: string;
};

export type ParseJobStatus = "processed" | "queued" | "processing" | "failed";

export type ParseJob = {
  id: string;
  status: ParseJobStatus;
  createdAt: string;
  file: ParseResultFile;
  tables: TableData[];
  errorMessage?: string | null;
};

export type ParseRequest = {
  id: string;
  status: ParseJobStatus;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  errorMessage: string | null;
  jobs: ParseJob[];
};

export const MAX_FILES_PER_REQUEST = 10;

export const initialRequests: ParseRequest[] = parserRequestsMock.map(
  (request) => ({
    ...request,
    jobs: request.jobs.map((job) => ({
      ...job,
      tables: job.tables.map((table) => ({
        ...table,
        header: [...table.header],
        rows: table.rows.map((row) => [...row]),
      })),
    })),
  }),
);

export function createRequestFromFiles(files: File[]): ParseRequest {
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

export function ParserService({ children }: { children: ReactNode }) {
  // #region state
  const anonSvc = useAnonService();

  // #endregion

  // #region http req
  const parserRequestsReq = useQuery({
    queryKey: ["parser", "requests"],
    queryFn: async () => api.parser.getRequests(anonSvc.anonId!),
    enabled: !!anonSvc.anonId,
  });
  // #endregion

  // #region selection state

  const [selectedRequestId, setSelectedRequestId] = useState<
    string | undefined
  >();
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();

  function selectRequest(requestId: string) {
    setSelectedRequestId(requestId);

    const request = requests.find((entry) => entry.id === requestId);
    setSelectedJobId(request?.jobs[0]?.id ?? "");
  }

  function selectJob(jobId: string) {
    setSelectedJobId(jobId);
  }

  // #endregion

  const [requests, setRequests] = useState(initialRequests);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const selectedRequest =
    requests.find((request) => request.id === selectedRequestId) ??
    requests[0] ??
    null;

  const jobs = selectedRequest?.jobs ?? [];

  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null;

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
      setUploadMessage(
        `${files.length} PDF${files.length > 1 ? "s" : ""} queued in a new request.`,
      );
    }

    const pdfFiles = files
      .filter(
        (file) => file.type === "application/pdf" || file.name.endsWith(".pdf"),
      )
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
    <ParserContext.Provider
      value={{
        requests,
        selectedRequestId,
        selectedJobId,
        selectedRequest,
        selectedJob,
        jobs,
        uploadMessage,
        maxFilesPerRequest: MAX_FILES_PER_REQUEST,
        selectRequest,
        selectJob,
        handleFilesChange,
      }}
    >
      {children}
    </ParserContext.Provider>
  );
}
