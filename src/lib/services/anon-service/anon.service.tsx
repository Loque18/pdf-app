"use client";

import { useState } from "react";
import {
  AnonCtx,
  AnonServiceCtx,
} from "@lib/services/anon-service/anon.context";

export default function AnonService({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anonId] = useState<string>(() => {
    const storedAnonId = localStorage.getItem("auth.anonId");

    if (storedAnonId) return storedAnonId;

    const newAnonId = crypto.randomUUID();
    localStorage.setItem("auth.anonId", newAnonId);

    return newAnonId;
  });

  const ctx: AnonServiceCtx = {
    anonId,
  };

  return <AnonCtx.Provider value={ctx}>{children}</AnonCtx.Provider>;
}
