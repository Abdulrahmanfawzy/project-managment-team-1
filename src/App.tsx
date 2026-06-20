import { useTranslation } from "react-i18next";
import LangSwitcher from "./components/shared/lang-switcher";

export default function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("dashboard.title")}</h1>
      <p>{t("common.welcome")}</p>
      <LangSwitcher />
    </div>
  );
}