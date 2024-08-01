"use client";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../../hooks/modalCommonLogic";
import initTranslations from "../../i18n";
import items from "../../utils/items";
import GetRequestContent from "./page-content";

const GetRequestPage = ({ params: { locale } }) => {
  const {
    loading,
    itemDetails,
    openMultiIdsModal,
    setOpenMultiIdsModal,
    openSingleIdModal,
    setOpenSingleIdModal,
    handleSelectItem,
    handleFetchObjectsById,
    handleFetchSingleObjectById,
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
        "Fetching translations for locale (Get Request Page):",
        locale
      );
      const { t } = await initTranslations(locale, ["common"]);
      console.log("Translations fetched (Get Request Page):", t);
      setT(() => t);
      setIsLoadingTranslations(false);
    };

    fetchTranslations();
  }, [locale]);

  // Filter items to include only those with ids 1, 2, and 3
  const filteredItem = items.filter((item) => [1, 2, 3].includes(item.id));

  return (
    <GetRequestContent
      t={t}
      locale={locale}
      itemDetails={itemDetails}
      loading={loading}
      handleSelectItem={handleSelectItem}
      openMultiIdsModal={openMultiIdsModal}
      setOpenMultiIdsModal={setOpenMultiIdsModal}
      openSingleIdModal={openSingleIdModal}
      setOpenSingleIdModal={setOpenSingleIdModal}
      handleFetchObjectsById={handleFetchObjectsById}
      handleFetchSingleObjectById={handleFetchSingleObjectById}
      filteredItem={filteredItem}
    />
  );
};

export default GetRequestPage;
