import { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations from "./translations";

const LangContext = createContext(null);
const TRANSLATIONS_API_URL = process.env.REACT_APP_TRANSLATIONS_API_URL;

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override ?? base;
  }

  const result = { ...base };
  Object.keys(override).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = override[key];
    result[key] = isPlainObject(baseValue) && isPlainObject(overrideValue)
      ? deepMerge(baseValue, overrideValue)
      : overrideValue;
  });

  return result;
}

function normalizeBackendTranslations(payload) {
  if (!payload) return {};

  if (Array.isArray(payload)) {
    return payload.reduce((acc, item) => {
      if (item?.code) acc[item.code] = item;
      return acc;
    }, {});
  }

  if (isPlainObject(payload)) {
    return payload;
  }

  return {};
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [backendTranslations, setBackendTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(false);
  const [translationError, setTranslationError] = useState(null);

  useEffect(() => {
    if (!TRANSLATIONS_API_URL) return;

    const controller = new AbortController();

    async function fetchTranslations() {
      try {
        setLoadingTranslations(true);
        setTranslationError(null);

        const response = await fetch(TRANSLATIONS_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load translations (${response.status})`);
        }

        const payload = await response.json();
        setBackendTranslations(normalizeBackendTranslations(payload));
      } catch (error) {
        if (error.name !== "AbortError") {
          setTranslationError(error.message || "Failed to load translations");
        }
      } finally {
        setLoadingTranslations(false);
      }
    }

    fetchTranslations();
    return () => controller.abort();
  }, []);

  const allTranslations = useMemo(() => {
    const merged = { ...translations };

    Object.keys(backendTranslations).forEach((code) => {
      const localVersion = translations[code] || {};
      merged[code] = deepMerge(localVersion, backendTranslations[code]);
    });

    return merged;
  }, [backendTranslations]);

  const fallbackLang = allTranslations.en ? "en" : Object.keys(allTranslations)[0];
  const activeLang = allTranslations[lang] ? lang : fallbackLang;
  const t = allTranslations[activeLang] || {};

  useEffect(() => {
    if (activeLang && activeLang !== lang) {
      setLang(activeLang);
    }
  }, [activeLang, lang]);

  return (
    <LangContext.Provider
      value={{
        lang: activeLang,
        setLang,
        t,
        translations: allTranslations,
        loadingTranslations,
        translationError,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
