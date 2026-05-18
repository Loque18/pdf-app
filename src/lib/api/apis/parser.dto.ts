import type { ParserRequestResource } from "../resource.types";

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
  parse_req: ParserRequestResource;
};
