import { useTranslation } from "react-i18next";
import LangSwitcher from "./components/shared/lang-switcher";
import AppRouter from "./app/index";

export default function App() {
  const { t } = useTranslation();

  return (
    <div>
       <AppRouter />
    </div>
  );
}