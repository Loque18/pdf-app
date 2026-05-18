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

  // selectedRequestId: string;
  // selectedJobId: string;
  // selectedRequest: ParseRequest | null;
  // selectedJob: ParseRequest["jobs"][number] | null;
  // jobs: ParseRequest["jobs"];
  // maxFilesPerRequest: number;
  // selectRequest: (requestId: string) => void;
  // selectJob: (jobId: string) => void;
  // createRequest: (files: File[]) => {
  //   ok: boolean;
  //   message: string;
  // };
};

export const ParserContext = createContext<ParserContextValue | null>(null);

export function useParserContext() {
  const context = useContext(ParserContext);

  if (!context) {
    throw new Error("useParserContext must be used within a ParserService");
  }

  return context;
}
