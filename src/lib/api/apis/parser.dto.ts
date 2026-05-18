import type { FileSummary, JobOutput } from "@lib/api/resource.types";

// ==================================================
// REQUESTS
// ==================================================

export type CreateParseRequest = FormData;

// ==================================================
// RESPONSES
// ==================================================

export type CreateParserResponse = {
  id: string;
  status: string;
  created_at: string;
  expires_at: string | null;
};

export type GetParserRequestResponseDto = {
  parse_req: {
    id: string;
    status: string;
    created_at: string;
    expires_at: string | null;
    error_message: string | null;
    results: {
      file: FileSummary;
      output: JobOutput;
    };
  };
};
