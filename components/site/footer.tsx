import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { OpenBadge } from "./open-badge";
import { Wordmark } from "./wordmark";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/menu", label: "Full menu" },
      { href: "/#by-the-liter", label: "By the liter" },
      { href: "/#build", label: "Build your drink" },
      { href: "/#gallery", label: "Gallery" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { href: "/#visit", label: "Location and hours" },
      { href: "/#reviews", label: "Reviews" },
      { href: "/#contact", label: "Book a table" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div>
            <div className="text-2xl">
              <Wordmark />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {site.tagline} Rice meals, pizza, pasta and milk tea by the liter
              in {site.address.city}.
            </p>
            <OpenBadge className="mt-6" />
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-display text-base">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse gap-6 border-t border-primary-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {site.legalName}. {site.address.street},{" "}
            {site.address.city}.
          </p>
          <div className="flex gap-3">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liters Cafe on Facebook"
              className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-primary-foreground/10"
            >
              <Facebook className="size-4" aria-hidden="true" />
            </a>
            <a
              href={site.messenger}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Liters Cafe"
              className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-primary-foreground/10"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
