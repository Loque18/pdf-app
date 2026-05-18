"use client";

import { ParserHeaderSection } from "@modules/parser/_sections/parser-header";
import { JobsColumnSection } from "@modules/parser/_sections/jobs-column";
import { ResultsColumnSection } from "@modules/parser/_sections/results-column";
import { RequestColumnSection } from "@modules/parser/_sections/request-column";

export function ParserTemplate() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fafaf9_0%,#f4f4f5_100%)] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* header and request upload */}
        <ParserHeaderSection />

        {/* main parser workspace */}
        <section className="grid flex-1 gap-4 lg:grid-cols-[320px_360px_minmax(0,1fr)]">
          {/* parse requests column */}
          <RequestColumnSection />

          {/* jobs column */}
          <JobsColumnSection />

          {/* results column */}
          <ResultsColumnSection />
        </section>
      </div>
    </main>
  );
}
