"use client";

import { createContext, useContext, type ReactNode } from "react";

const ImageAvailabilityContext = createContext<Set<string>>(new Set());

export function ImageAvailabilityProvider({
  available,
  children,
}: {
  available: string[];
  children: ReactNode;
}) {
  return (
    <ImageAvailabilityContext.Provider value={new Set(available)}>
      {children}
    </ImageAvailabilityContext.Provider>
  );
}

export function useHasImage(file?: string) {
  const available = useContext(ImageAvailabilityContext);
  return file ? available.has(file) : false;
}
