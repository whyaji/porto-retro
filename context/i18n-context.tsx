"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback, useMemo } from "react";
import type { Locale } from "@/types/project";
import { resolveTranslations, type Translations } from "@/i18n/company";
import { SITE_MODE } from "@/lib/site-mode";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "patriaworks_locale";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("patriaworks_locale_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("patriaworks_locale_change", callback);
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
      window.dispatchEvent(new Event("patriaworks_locale_change"));
    } catch {
      // ignore in restricted envs
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  const t = useMemo(() => resolveTranslations(SITE_MODE, locale), [locale]);

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
      t: resolveTranslations(SITE_MODE, "en"),
      toggleLocale: () => {},
    };
  }
  return context;
}
