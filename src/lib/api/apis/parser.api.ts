import type { AxiosInstance } from "axios";
import { endpoints } from "../endpoints";
import type {
  CreateParseRequest,
  CreateParserResponse,
  GetParserRequestResponseDto,
} from "@lib/api/apis/parser.dto";

export function createParserApi(axios: AxiosInstance) {
  return {
    async createRequest(dto: CreateParseRequest) {
      const res = await axios<CreateParserResponse>({
        method: "POST",
        data: dto,
        url: endpoints.parser.create,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },

    async listUserRequests(anonId: string) {
      const res = await axios<GetParserRequestResponseDto[]>({
        method: "GET",
        url: endpoints.parser.listUserRequests,
        data: {
          anonId,
        },
      });

      return res.data;
    },

    async getRequests(requestId: string) {
      const res = await axios.get<GetParserRequestResponseDto>(
        `${endpoints.parser}/${requestId}`,
      );

      return res.data;
    },
  };
}
