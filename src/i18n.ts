import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

// Retrieve saved language from localStorage if available, default to English
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: "en",
    lng: savedLanguage,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Apply direction and lang attributes to html tag
const updateHtmlAttributes = (lng: string) => {
  const normalizedLng = lng.startsWith("ar") ? "ar" : "en";
  document.documentElement.dir = normalizedLng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = normalizedLng;
};

// Listen for language changes and update dynamically
i18n.on("languageChanged", (lng) => {
  const normalizedLng = lng.startsWith("ar") ? "ar" : "en";
  localStorage.setItem("language", normalizedLng);
  updateHtmlAttributes(normalizedLng);
});

// Run initial update
updateHtmlAttributes(i18n.language || savedLanguage);

export default i18n;
