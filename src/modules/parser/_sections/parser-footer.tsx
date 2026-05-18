"use client";

import { Button } from "@ui/elements";

export function ParserFooterSection() {
  return (
    <footer className="mt-4 flex flex-col gap-3 rounded-[24px] border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Template only. Hook your parser API into request creation and job
        updates next.
      </p>
      <Button variant={{ color: "ghost", size: "40" }}>
        Connect parser service
      </Button>
    </footer>
  );
}
