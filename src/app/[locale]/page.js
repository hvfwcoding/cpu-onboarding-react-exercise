"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../hooks/useModalLogic";
import initTranslations from "../i18n";
import PageContent from "./page-content";

const DesktopBreakpoint = dynamic(
  () => import("../components/responsive_utilities/DesktopBreakpoint"),
  { ssr: false }
);
const TabletBreakpoint = dynamic(
  () => import("../components/responsive_utilities/TabletBreakpoint"),
  { ssr: false }
);
const PhoneBreakpoint = dynamic(
  () => import("../components/responsive_utilities/DesktopBreakpoint"),
  { ssr: false }
);

export default function Home({ params: { locale } }) {
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    async function loadTranslations() {
      const { t } = await initTranslations(locale, ["home"]);
      setT(() => t);
    }
    loadTranslations();
  }, [locale]);

  const {
    loading,
    itemDetails,
    openMultiIdsModal,
    setOpenMultiIdsModal,
    openSingleIdModal,
    setOpenSingleIdModal,
    openAddModal,
    setOpenAddModal,
    openUpdateModal,
    setOpenUpdateModal,
    openPartiallyUpdateModal,
    setOpenPartiallyUpdateModal,
    openDeleteModal,
    setOpenDeleteModal,
    handleSelectItem,
    handleFetchObjectsById,
    handleFetchSingleObjectById,
    handleAddObject,
    handleUpdateObject,
    handlePartialUpdateObject,
    handleDeleteObject,
  } = useModalCommonLogic();

  useEffect(() => {
    console.log("Home component itemDetails updated:", itemDetails);
  }, [itemDetails]);

  return (
    <>
      <DesktopBreakpoint>
        <PageContent
          t={t}
          locale={locale}
          itemDetails={itemDetails}
          loading={loading}
          handleSelectItem={handleSelectItem}
          openMultiIdsModal={openMultiIdsModal}
          setOpenMultiIdsModal={setOpenMultiIdsModal}
          openSingleIdModal={openSingleIdModal}
          setOpenSingleIdModal={setOpenSingleIdModal}
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          openPartiallyUpdateModal={openPartiallyUpdateModal}
          setOpenPartiallyUpdateModal={setOpenPartiallyUpdateModal}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleFetchObjectsById={handleFetchObjectsById}
          handleFetchSingleObjectById={handleFetchSingleObjectById}
          handleAddObject={handleAddObject}
          handleUpdateObject={handleUpdateObject}
          handlePartialUpdateObject={handlePartialUpdateObject}
          handleDeleteObject={handleDeleteObject}
        />
      </DesktopBreakpoint>

      <TabletBreakpoint>
        <PageContent
          t={t}
          locale={locale}
          itemDetails={itemDetails}
          loading={loading}
          handleSelectItem={handleSelectItem}
          openMultiIdsModal={openMultiIdsModal}
          setOpenMultiIdsModal={setOpenMultiIdsModal}
          openSingleIdModal={openSingleIdModal}
          setOpenSingleIdModal={setOpenSingleIdModal}
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          openPartiallyUpdateModal={openPartiallyUpdateModal}
          setOpenPartiallyUpdateModal={setOpenPartiallyUpdateModal}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleFetchObjectsById={handleFetchObjectsById}
          handleFetchSingleObjectById={handleFetchSingleObjectById}
          handleAddObject={handleAddObject}
          handleUpdateObject={handleUpdateObject}
          handlePartialUpdateObject={handlePartialUpdateObject}
          handleDeleteObject={handleDeleteObject}
        />
      </TabletBreakpoint>

      <PhoneBreakpoint>
        <PageContent
          t={t}
          locale={locale}
          itemDetails={itemDetails}
          loading={loading}
          handleSelectItem={handleSelectItem}
          openMultiIdsModal={openMultiIdsModal}
          setOpenMultiIdsModal={setOpenMultiIdsModal}
          openSingleIdModal={openSingleIdModal}
          setOpenSingleIdModal={setOpenSingleIdModal}
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          openPartiallyUpdateModal={openPartiallyUpdateModal}
          setOpenPartiallyUpdateModal={setOpenPartiallyUpdateModal}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleFetchObjectsById={handleFetchObjectsById}
          handleFetchSingleObjectById={handleFetchSingleObjectById}
          handleAddObject={handleAddObject}
          handleUpdateObject={handleUpdateObject}
          handlePartialUpdateObject={handlePartialUpdateObject}
          handleDeleteObject={handleDeleteObject}
        />
      </PhoneBreakpoint>
    </>
  );
}
