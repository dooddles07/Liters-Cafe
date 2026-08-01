"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { messengerLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Reason = "Reserve a table" | "Group booking" | "Ask a question";

const reasons: Reason[] = ["Reserve a table", "Group booking", "Ask a question"];

/**
 * No backend. The form composes a tidy message and hands it to Messenger,
 * which is where this cafe already takes enquiries. Nothing is stored here,
 * so there is no inbox for anyone to forget to check.
 */
export function Contact() {
  const [reason, setReason] = useState<Reason>("Reserve a table");
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const [people, setPeople] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const needsBooking = reason !== "Ask a question";

  const peopleTrimmed = people.trim();
  const peopleOk = !needsBooking || /^[1-9]\d?$/.test(peopleTrimmed);
  const whenOk = !needsBooking || when.trim().length > 0;
  const formValid = name.trim().length > 0 && whenOk && peopleOk;

  const nameMissing = touched && name.trim().length === 0;
  const whenMissing = touched && needsBooking && when.trim().length === 0;
  const peopleInvalid = touched && needsBooking && !peopleOk;

  const compose = () =>
    [
      `Hi Liters! ${reason}.`,
      name.trim() && `Name: ${name.trim()}`,
      needsBooking && when.trim() && `When: ${when.trim()}`,
      needsBooking && people.trim() && `Party size: ${people.trim()}`,
      message.trim() && `\n${message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid) return;
    window.open(messengerLink(compose()), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-muted/50 py-20 md:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-xl">
          <Reveal className="text-center">
            <SectionHeading eyebrow="Book ahead" size="md">
              Bringing a table or a barkada?
            </SectionHeading>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Fill this in and Messenger opens with your details already typed.
              Hit send and we&apos;ll reply there.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="mt-10 space-y-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">
                  What is this about?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReason(r)}
                      aria-pressed={reason === r}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                        reason === r
                          ? "border-accent bg-accent font-semibold text-accent-foreground"
                          : "border-border bg-background hover:border-accent/50",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </fieldset>

              <Input
                id="name"
                label="Your name"
                value={name}
                onChange={setName}
                required
                error={nameMissing ? "We need a name to hold the booking." : null}
              />

              {needsBooking && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    id="when"
                    label="Day and time"
                    placeholder="Saturday, 7 PM"
                    value={when}
                    onChange={setWhen}
                    required
                    error={whenMissing ? "Let us know when you're coming." : null}
                  />
                  <Input
                    id="people"
                    label="How many people"
                    placeholder="6"
                    value={people}
                    onChange={(v) => setPeople(v.replace(/[^\d]/g, "").slice(0, 2))}
                    inputMode="numeric"
                    required
                    error={peopleInvalid ? "Enter a party size (1-99)." : null}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Anything else
                  <span className="ml-2 font-normal text-muted-foreground">
                    Optional
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Celebrating a birthday, need a quiet corner, anything at all."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/70"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Send className="size-4" />
                Open in Messenger
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Opens in a new tab. Nothing is stored on this site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
        {!required && (
          <span className="ml-2 font-normal text-muted-foreground">
            Optional
          </span>
        )}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-xl border bg-background px-4 text-sm placeholder:text-muted-foreground/70",
          error ? "border-destructive" : "border-border",
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
