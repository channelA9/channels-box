import { ref, computed } from "vue";
import type { Language, Translations } from "./i18n";
import { getTranslations } from "./i18n";

const currentLanguage = ref<Language>("en");
let initialized = false;

// Auto-initialize on first import (SSR-safe)
function autoInit() {
  if (initialized) return;
  if (typeof window === "undefined") return;

  initialized = true;

  const saved = localStorage.getItem("preferred-language") as Language;
  if (saved && (saved === "en" || saved === "jp")) {
    currentLanguage.value = saved;
    return;
  }

  // Detect browser locale on first visit
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("ja")) {
    currentLanguage.value = "jp";
  } else {
    currentLanguage.value = "en";
  }

  localStorage.setItem("preferred-language", currentLanguage.value);
}

export function useLanguage() {
  const language = computed(() => currentLanguage.value);

  const t = computed<Translations>(() => getTranslations(currentLanguage.value));

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage.value === "en" ? "jp" : "en");
  };

  // Keep initLanguage for backward compat, but it now just calls autoInit
  const initLanguage = () => {
    autoInit();
  };

  // Auto-init when composable is first used
  autoInit();

  return {
    language,
    t,
    setLanguage,
    toggleLanguage,
    initLanguage,
  };
}
