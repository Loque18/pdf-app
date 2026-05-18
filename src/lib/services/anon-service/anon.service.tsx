/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  AnonCtx,
  AnonServiceCtx,
} from "@lib/services/anon-service/anon.context";

export default function AnonService({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anonId, setAnonId] = useState<string | null>(null);

  useEffect(() => {
    let storedAnonId = localStorage.getItem("anonId");

    if (!storedAnonId) {
      storedAnonId = crypto.randomUUID();
      localStorage.setItem("anonId", storedAnonId);
    }

    setAnonId(storedAnonId);
  }, []);

  if (!anonId) return null;

  const ctx: AnonServiceCtx = {
    anonId,
  };

  return <AnonCtx.Provider value={ctx}>{children}</AnonCtx.Provider>;
}
