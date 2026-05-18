"use client";

// third party
import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

// lib
import { getApi } from "@lib/api/api";

// self
import { ParserContext } from "@modules/parser/parser.context";
import { useAnonService } from "@lib/services/anon-service/anon.context";

export const MAX_FILES_PER_REQUEST = 10;

export function createRequestFromFiles(files: File[]): any {
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

  const [api] = useState(() => getApi(anonSvc.anonId));

  // #endregion

  // #region http req
  const parseRequestReq = useQuery({
    queryKey: ["parser", "requests"],
    queryFn: async () => api.parser.list(),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
  // #endregion

  // #region selection state

  const [selectedReqId, setSelectedReqId] = useState<string | undefined>();
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();

  function selectRequest(reqId: string) {
    setSelectedReqId(reqId);

    const request = parseRequestReq.data?.find((entry) => entry.id === reqId);
    setSelectedJobId(request?.jobs[0]?.id ?? "");
  }

  function selectJob(jobId: string) {
    setSelectedJobId(jobId);
  }

  const selectedRequest =
    parseRequestReq.data?.find((request) => request.id === selectedReqId) ??
    null;

  const jobs = selectedRequest?.jobs ?? [];

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;

  // #endregion

  function createRequest(files: File[]) {
    if (files.length === 0) {
      return {
        ok: false,
        message: "Select at least one PDF file before sending the request.",
      };
    }

    const pdfFiles = files
      .filter(
        (file) => file.type === "application/pdf" || file.name.endsWith(".pdf"),
      )
      .slice(0, MAX_FILES_PER_REQUEST);

    if (pdfFiles.length === 0) {
      return {
        ok: false,
        message: "Only PDF files are allowed in a parse request.",
      };
    }

    if (pdfFiles.length !== files.length) {
      return {
        ok: false,
        message: `A request can include only ${MAX_FILES_PER_REQUEST} PDF files.`,
      };
    }

    const nextRequest = createRequestFromFiles(pdfFiles);

    setSelectedReqId(nextRequest.id);
    setSelectedJobId(nextRequest.jobs[0]?.id ?? "");

    return {
      ok: true,
      message: `${pdfFiles.length} PDF${pdfFiles.length > 1 ? "s were" : " was"} queued successfully.`,
    };
  }

  return (
    <ParserContext.Provider
      value={{
        requests: {
          parseRequestReq,
        },
        fn: {
          selectRequest,
          selectJob,
          createRequest,
        },
        state: {
          selectedRequestId: selectedReqId,
          selectedJobId,
          selectedRequest,
          selectedJob,
        },
        maxFilesPerRequest: MAX_FILES_PER_REQUEST,
      }}
    >
      {children}
    </ParserContext.Provider>
  );
}
