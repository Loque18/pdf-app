import type { JobSummary } from "@lib/api/resource.types";

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

export type RetrieveParserRequestResponse = {
  id: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  jobs: JobSummary[];
};

export type ListRequestsResponse = RetrieveParserRequestResponse[];
