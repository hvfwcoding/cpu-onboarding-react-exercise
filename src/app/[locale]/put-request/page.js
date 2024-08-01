"use client";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../../hooks/modalCommonLogic";
import initTranslations from "../../i18n";
import items from "../../utils/items";
import PutRequestContent from "./page-content";

const PutRequestPage = ({ params: { locale } }) => {
  const {
    loading,
    itemDetails,
    openUpdateModal,
    setOpenUpdateModal,
    handleSelectItem,
    handleUpdateObject,
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
        "Fetching translations for locale (Put Request Page):",
        locale
      );
      const { t } = await initTranslations(locale, ["common"]);
      console.log("Translations fetched (Put Request Page):", t);
      setT(() => t);
      setIsLoadingTranslations(false);
    };

    fetchTranslations();
  }, [locale]);

  // Filter items to only include id 5
  const filteredItem = items.filter((item) => item.id === 5);

  return (
    <PutRequestContent
      t={t}
      locale={locale}
      itemDetails={itemDetails}
      loading={loading}
      handleSelectItem={handleSelectItem}
      openUpdateModal={openUpdateModal}
      setOpenUpdateModal={setOpenUpdateModal}
      handleUpdateObject={handleUpdateObject}
      setItemDetails={setItemDetails}
      filteredItem={filteredItem}
    />
  );
};

export default PutRequestPage;
