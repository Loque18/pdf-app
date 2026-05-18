import type { AxiosInstance } from "axios";
import { endpoints } from "@lib/api/endpoints";
import type {
  CreateParseRequest,
  CreateParserResponse,
  ListRequestsResponse,
  RetrieveParserRequestResponse,
} from "@lib/api/apis/parser.dto";

export function createParserApi(axios: AxiosInstance, anonId: string) {
  return {
    async createRequest(dto: CreateParseRequest) {
      const res = await axios<CreateParserResponse>({
        method: "POST",
        data: dto,
        url: endpoints.parser.create,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-client-Id": anonId,
        },
      });

      return res.data;
    },

    async list() {
      const res = await axios<ListRequestsResponse>({
        method: "GET",
        url: endpoints.parser.list,
        headers: {
          "X-client-Id": anonId,
        },
      });

      return res.data;
    },

    async retrieve(requestId: string) {
      const res = await axios<RetrieveParserRequestResponse>({
        method: "GET",
        url: endpoints.parser.retrieve.replace(":requestId", requestId),
        headers: {
          "X-client-Id": anonId,
        },
      });

      return res.data;
    },
  };
}
