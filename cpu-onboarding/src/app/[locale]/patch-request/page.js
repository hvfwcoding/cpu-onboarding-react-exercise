"use client";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../../hooks/modalCommonLogic";
import initTranslations from "../../i18n";
import items from "../../utils/items";
import PatchRequestContent from "./page-content";

const PatchRequestPage = ({ params: { locale } }) => {
  const {
    loading,
    itemDetails,
    openPartiallyUpdateModal,
    setOpenPartiallyUpdateModal,
    handleSelectItem,
    handlePartialUpdateObject,
    setItemDetails,
  } = useModalCommonLogic();

  const [t, setT] = useState(() => (key) => key);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  useEffect(() => {
    if (!locale) {
      console.error("Locale is undefined, skipping translation fetch.");
      return;
    }

    const fetchTranslations = async () => {
      console.log(
        "Fetching translations for locale (Patch Request Page):",
        locale
      );
      const { t } = await initTranslations(locale, ["common"]);
      console.log("Translations fetched (Patch Request Page):", t);
      setT(() => t);
      setIsLoadingTranslations(false);
    };

    fetchTranslations();
  }, [locale]);

  // Filter items to only include id 6
  const filteredItem = items.filter((item) => item.id === 6);

  return (
    <PatchRequestContent
      t={t}
      locale={locale}
      itemDetails={itemDetails}
      loading={loading}
      handleSelectItem={handleSelectItem}
      openPartiallyUpdateModal={openPartiallyUpdateModal}
      setOpenPartiallyUpdateModal={setOpenPartiallyUpdateModal}
      handlePartialUpdateObject={handlePartialUpdateObject}
      setItemDetails={setItemDetails}
      filteredItem={filteredItem}
    />
  );
};

export default PatchRequestPage;
