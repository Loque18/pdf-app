"use client";

import { createContext, useContext } from "react";

export type AnonServiceCtx = {
  anonId: string;
};

// @ts-expect-error init later
export const AnonCtx = createContext<AnonServiceCtx>(null);

export function useAnonService(): AnonServiceCtx {
  const ctx = useContext(AnonCtx);
  if (!ctx) {
    throw new Error("useAnonService must be used within an AnonProvider");
  }
  return ctx;
}
