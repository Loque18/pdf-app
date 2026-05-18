import axios from "axios";

import { createParserApi } from "@lib/api/apis/parser.api";
import getConfig from "@lib/platform/config";

const client = axios.create({
  baseURL: getConfig().api_url,
});

export const api = {
  parser: createParserApi(client),
};
