import { useEffect, useState } from "react";
import initTranslations from "../i18n";
import { ItemButton, LeftPanelContainer } from "../styles/LeftPanel";

const LeftPanel = ({ items, onSelectItem, locale }) => {
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    if (!locale) {
      console.error("Locale is undefined, skipping translation fetch.");
      return;
    }

    const fetchTranslations = async () => {
      console.log("Fetching translations for locale (Left Panel):", locale);
      const { t } = await initTranslations(locale, ["left panel"]);
      console.log("Translations fetched (Left Panel):", t);
      setT(() => t);

      items.forEach((item) => {
        console.log(
          `Translated item text for item_${item.id} in Left Panel:`,
          t(`item_${item.id}`)
        );
      });
    };

    fetchTranslations();
  }, [locale, items]);

  return (
    <LeftPanelContainer>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded"
        >
          <span className="text-xl">{t(`item_${item.id}`)}</span>
          <ItemButton variant="contained" onClick={() => onSelectItem(item.id)}>
            {t("select_button")}
          </ItemButton>
        </div>
      ))}
    </LeftPanelContainer>
  );
};

export default LeftPanel;
