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
    let anonId = localStorage.getItem("anonId");

    if (!anonId) {
      anonId = crypto.randomUUID();
      localStorage.setItem("anonId", anonId);
    }
    return anonId;
  });

  const ctx: AnonServiceCtx = {
    anonId,
  };

  return <AnonCtx.Provider value={ctx}>{children}</AnonCtx.Provider>;
}
