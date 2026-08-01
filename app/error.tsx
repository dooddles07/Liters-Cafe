"use client";

import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-28 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Something went wrong
      </p>
      <h1 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        This page tripped over its own feet.
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Nothing was lost, just a glitch loading this page. Try again or head
        back to the homepage.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
