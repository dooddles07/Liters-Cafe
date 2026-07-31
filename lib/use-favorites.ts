"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "liters:favourites";
const EVENT = "liters:favourites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * A saved list of menu item ids, kept in localStorage so it survives a
 * refresh. Every mounted copy of the hook stays in sync through a custom
 * event, and across tabs through `storage`.
 */
export function useFavourites() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(read());
    setReady(true);

    const sync = () => setIds(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = read().includes(id)
      ? read().filter((x) => x !== id)
      : [...read(), id];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { ids, toggle, clear, ready, has: (id: string) => ids.includes(id) };
}
