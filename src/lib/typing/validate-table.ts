import type { Table } from "@lib/api/resource.types";
import { z } from "zod";

export const tableSchema: z.ZodType<Table> = z.object({
  header: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export function isTable(value: unknown): value is Table {
  return tableSchema.safeParse(value).success;
}

export function filterTablePayload(payload: unknown[]): Table[] {
  return payload.filter(isTable);
}
