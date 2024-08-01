import { useEffect, useState } from "react";
import initTranslations from "../i18n";
import {
  InformationRectangle,
  ResultRectangle,
  RightPanelContainer,
} from "../styles/RightPanel";

const RightPanel = ({ itemDetails, loading, locale }) => {
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    if (!locale) {
      console.error("Locale is undefined, skipping translation fetch.");
      return;
    }

    const fetchTranslations = async () => {
      console.log("Fetching translations for locale (Right Panel):", locale);
      const { t } = await initTranslations(locale, ["right panel"]);
      console.log("Translations fetched (Right Panel):", t);
      setT(() => t);
    };

    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    console.log("RightPanel received itemDetails:", itemDetails);
  }, [itemDetails]);

  return (
    <RightPanelContainer>
      <InformationRectangle>
        {!itemDetails && !loading && <p>{t("guidance_1")}</p>}
        {loading && <p>{t("loading")}</p>}
        {itemDetails && <p>{t("guidance_2")}</p>}
      </InformationRectangle>
      <ResultRectangle>
        {itemDetails && !loading && (
          <pre>{JSON.stringify(itemDetails, null, 2)}</pre>
        )}
      </ResultRectangle>
    </RightPanelContainer>
  );
};

export default RightPanel;
