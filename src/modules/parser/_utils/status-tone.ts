type ParserStatus = "processed" | "queued" | "processing" | "failed";

export function getStatusTone(status: ParserStatus) {
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
