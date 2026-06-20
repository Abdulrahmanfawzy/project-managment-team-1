import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export default function LangSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div>
            <Button variant="brand" onClick={() => i18n.changeLanguage("en")}>EN</Button>
            <Button onClick={() => i18n.changeLanguage("ar")}>AR</Button>
        </div>
    );
}