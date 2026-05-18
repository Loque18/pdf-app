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

  // #region http post

  const [createRequestLoading, setCreateRequestLoading] = useState(false);
  const [createRequestError, setCreateRequestError] = useState<string | null>(
    null,
  );
  const [createRequestStatus, setCreateRequestStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  async function createRequest(files: File[]): Promise<void> {
    setCreateRequestError(null);
    setCreateRequestLoading(true);
    try {
      if (files.length === 0) {
        throw new Error(
          "Select at least one PDF file before sending the request.",
        );
      }

      const pdfFiles = files
        .filter(
          (file) =>
            file.type === "application/pdf" || file.name.endsWith(".pdf"),
        )
        .slice(0, MAX_FILES_PER_REQUEST);

      if (pdfFiles.length === 0) {
        throw new Error("Only PDF files are allowed.");
      }

      if (pdfFiles.length !== files.length) {
        throw new Error(
          "Some files were ignored because they are not valid PDF files.",
        );
      }

      const formData = new FormData();
      pdfFiles.forEach((file) => formData.append("files", file));

      await api.parser.createRequest(formData);
      setCreateRequestStatus("success");

      parseRequestReq.refetch();
    } catch (error) {
      setCreateRequestError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the request.",
      );
      setCreateRequestStatus("error");
    } finally {
      setCreateRequestLoading(false);
    }
  }

  // #endregion

  return (
    <ParserContext.Provider
      value={{
        requests: {
          parseRequestReq,
          createRequest: {
            isLoading: createRequestLoading,
            error: createRequestError,
            exec: createRequest,
          },
        },
        fn: {
          selectRequest,
          selectJob,
        },
        state: {
          selectedRequestId: selectedReqId,
          selectedJobId,
          selectedRequest,
          selectedJob,
          createRequestStatus,
        },
        maxFilesPerRequest: MAX_FILES_PER_REQUEST,
      }}
    >
      {children}
    </ParserContext.Provider>
  );
}
