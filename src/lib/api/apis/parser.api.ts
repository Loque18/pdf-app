import type { AxiosInstance } from "axios";
import { endpoints } from "../endpoints";
import type {
  CreateParseRequest,
  CreateParserResponse,
  GetParserRequestResponseDto,
} from "./parser.dto";

export function createParserApi(axios: AxiosInstance) {
  return {
    async createRequest(dto: CreateParseRequest) {
      const res = await axios<CreateParserResponse>({
        method: "POST",
        data: dto,
        url: endpoints.parser,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },

    async getRequest(requestId: string) {
      const res = await axios.get<GetParserRequestResponseDto>(
        `${endpoints.parser}/${requestId}`,
      );

      return res.data;
    },
  };
}
