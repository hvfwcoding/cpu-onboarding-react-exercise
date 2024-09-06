"use client";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../../hooks/useModalLogic";
import initTranslations from "../../i18n";
import items from "../../utils/items";
import DeleteRequestContent from "./page-content";

const DeleteRequestPage = ({ params: { locale } }) => {
  const {
    loading,
    itemDetails,
    openDeleteModal,
    setOpenDeleteModal,
    handleSelectItem,
    handleDeleteObject,
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
      const { t } = await initTranslations(locale, ["common"]);
      setT(() => t);
      setIsLoadingTranslations(false);
    };

    fetchTranslations();
  }, [locale]);

  // Filter items to include only those with ids 1, 2, and 3
  const filteredItem = items.filter((item) => item.id === 7);

  return (
    <DeleteRequestContent
      t={t}
      locale={locale}
      itemDetails={itemDetails}
      loading={loading}
      handleSelectItem={handleSelectItem}
      handleDeleteObject={handleDeleteObject}
      setItemDetails={setItemDetails}
      filteredItem={filteredItem}
      openDeleteModal={openDeleteModal}
      setOpenDeleteModal={setOpenDeleteModal}
    />
  );
};

export default DeleteRequestPage;
