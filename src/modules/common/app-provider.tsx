"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/instances/react-query";
import { useState, type ReactNode } from "react";
import AnonService from "@lib/services/anon-service/anon.service";

export function ThirdPartyProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function ServicesProvider({ children }: { children: ReactNode }) {
  return <AnonService>{children}</AnonService>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThirdPartyProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </ThirdPartyProvider>
  );
}
