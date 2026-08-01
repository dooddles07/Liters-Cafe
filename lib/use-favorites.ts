"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "liters:favorites";
const EVENT = "liters:favorites-changed";

let cache: string[] = [];
let cacheRaw: string | null = null;

/** Reparses only when the underlying value actually changed, so the
 *  snapshot reference stays stable between renders. */
function getSnapshot(): string[] {
  const raw = window.localStorage.getItem(KEY);
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    cache = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

const emptySnapshot: string[] = [];
function getServerSnapshot(): string[] {
  return emptySnapshot;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function read(): string[] {
  if (typeof window === "undefined") return [];
  return getSnapshot();
}

/**
 * A saved list of menu item ids, kept in localStorage so it survives a
 * refresh. Every mounted copy of the hook stays in sync through a custom
 * event, and across tabs through `storage`.
 */
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

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
