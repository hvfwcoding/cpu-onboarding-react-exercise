"use client";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../../hooks/modalCommonLogic";
import initTranslations from "../../i18n";
import items from "../../utils/items";
import PostRequestContent from "./page-content";

const PostRequestPage = ({ params: { locale } }) => {
  const {
    loading,
    itemDetails,
    openAddModal,
    setOpenAddModal,
    handleSelectItem,
    handleAddObject,
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
        "Fetching translations for locale (Post Request Page):",
        locale
      );
      const { t } = await initTranslations(locale, ["common"]);
      console.log("Translations fetched (Post Request Page):", t);
      setT(() => t);
      setIsLoadingTranslations(false);
    };

    fetchTranslations();
  }, [locale]);

  // Filter items to only include id 4
  const filteredItem = items.filter((item) => item.id === 4);

  return (
    <PostRequestContent
      t={t}
      locale={locale}
      itemDetails={itemDetails}
      loading={loading}
      handleSelectItem={handleSelectItem}
      openAddModal={openAddModal}
      setOpenAddModal={setOpenAddModal}
      handleAddObject={handleAddObject}
      filteredItem={filteredItem}
    />
  );
};

export default PostRequestPage;
