import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Charge les fichiers de traduction
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Intègre avec React
  .init({
    fallbackLng: "en", // Langue par défaut
    debug: true, // Active les logs pour le développement
    interpolation: {
      escapeValue: false, // Pas nécessaire pour React
    },
  });

export default i18n;
