"use client";

import { createContext, useContext, type ChangeEvent } from "react";
import type { ParseRequest } from "./parser.service";

export type ParserContextValue = {
  requests: ParseRequest[];
  selectedRequestId: string;
  selectedJobId: string;
  selectedRequest: ParseRequest | null;
  selectedJob: ParseRequest["jobs"][number] | null;
  jobs: ParseRequest["jobs"];
  uploadMessage: string | null;
  maxFilesPerRequest: number;
  selectRequest: (requestId: string) => void;
  selectJob: (jobId: string) => void;
  handleFilesChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ParserContext = createContext<ParserContextValue | null>(null);

export function useParserContext() {
  const context = useContext(ParserContext);

  if (!context) {
    throw new Error("useParserContext must be used within a ParserService");
  }

  return context;
}
