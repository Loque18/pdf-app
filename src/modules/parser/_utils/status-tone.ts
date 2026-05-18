import type { ParseJobStatus } from "../parser.service";

export function getStatusTone(status: ParseJobStatus) {
  if (status === "processed") {
    return { color: "green" as const, label: "Processed" };
  }

  if (status === "processing") {
    return { color: "blue" as const, label: "Processing" };
  }

  if (status === "failed") {
    return { color: "neutral" as const, label: "Failed" };
  }

  return { color: "neutral" as const, label: "Queued" };
}
