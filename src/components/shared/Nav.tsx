import React from "react";
import SelectDropdown from "@/components/shared/select-dropdown";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

export default function Nav() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="flex justify-between items-center py-2 sm:py-4 px-5">
      <div className="">
        <h1 className="text-Auth-head-font-color font-semibold text-xl ">
          Collabspace
        </h1>
      </div>
      <div>
        <SelectDropdown
          value={currentLang}
          onValueChange={handleLanguageChange}
          options={languages}
        />
      </div>
    </nav>
  );
}
