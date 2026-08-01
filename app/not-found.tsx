import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-28 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        That page isn&apos;t on the menu.
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the
        homepage or check out the full menu.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/menu" variant="outline">
          View menu
        </ButtonLink>
      </div>
    </div>
  );
}
