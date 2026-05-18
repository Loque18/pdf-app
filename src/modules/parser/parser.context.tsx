"use client";

// third party
import { createContext, useContext } from "react";
import { UseQueryResult } from "@tanstack/react-query";

// lib
import {
  ListRequestsResponse,
  RetrieveParserRequestResponse,
} from "@lib/api/apis/parser.dto";
import { JobSummary } from "@lib/api/resource.types";

// self

export type ParserContextValue = {
  requests: {
    parseRequestReq: UseQueryResult<ListRequestsResponse, Error>;
    createRequest: {
      isLoading: boolean;
      error: string | null;
      createRequestStatus: "idle" | "success" | "error";
      exec(files: File[]): Promise<void>;
    };
  };
  fn: {
    selectRequest(reqId: string): void;
    selectJob(jobId: string): void;
  };

  state: {
    selectedRequestId: string | undefined;
    selectedJobId: string | undefined;

    selectedRequest: RetrieveParserRequestResponse | null;
    selectedJob: JobSummary | null;
  };
  maxFilesPerRequest: number;
};

export const ParserContext = createContext<ParserContextValue | null>(null);

export function useParserContext() {
  const context = useContext(ParserContext);

  if (!context) {
    throw new Error("useParserContext must be used within a ParserService");
  }

  return context;
}
