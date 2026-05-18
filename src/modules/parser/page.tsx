import { ParserService } from "./parser.service";
import { ParserTemplate } from "./parser.template";

export default function ParserPage() {
  return (
    <ParserService>
      <ParserTemplate />
    </ParserService>
  );
}
