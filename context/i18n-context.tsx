"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react";
import type { Locale } from "@/types/project";
import { idTranslations } from "@/i18n/id";
import { enTranslations } from "@/i18n/en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof enTranslations;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "patrialabs_locale";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("patrialabs_locale_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("patrialabs_locale_change", callback);
  };
}

function getSnapshot(): Locale {
  try {
    const val = localStorage.getItem(LOCAL_STORAGE_KEY);
    return val === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Locale {
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
      window.dispatchEvent(new Event("patrialabs_locale_change"));
    } catch {
      // ignore in restricted envs
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  const t = locale === "id" ? idTranslations : enTranslations;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: enTranslations,
      toggleLocale: () => {},
    };
  }
  return context;
}
