export type ParserTableResource = {
  header: string[];
  rows: string[][];
};

export type ParserFileResource = {
  original_name: string;
  url: string;
  key: string;
};

export type ParserOutputResource = {
  id: number;
  payload: {
    tables: ParserTableResource[];
  };
};

export type ParserResultResource = {
  file: ParserFileResource;
  output: ParserOutputResource | null;
};

export type ParserRequestResource = {
  id: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  error_message: string | null;
  results: ParserResultResource[];
};

export type Table = {
  header: string[];
  rows: string[][];
};

export type FileSummary = {
  original_name: string;
  url: string;
  key: string;
};

export type JobOutput = {
  id: number;
  payload: Table[];
};
