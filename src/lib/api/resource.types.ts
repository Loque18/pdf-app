// ==================================================
// PARSE REQUESTS
// ==================================================
export type Table = {
  header: string[];
  rows: string[][];
};

export type FileSummary = {
  original_name: string;
  url: string;
  mime_type: string;
  size: number;
};

export type JobOutput = {
  id: number;
  payload: any[];
};

export type JobSummary = {
  id: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  error_message: string | null;
  file: FileSummary;
  output: JobOutput | null;
};
