"use client";
import { useEffect } from "react";
import AddModal from "../components/AddModal";
import DeleteModal from "../components/DeleteModal";
import LeftPanel from "../components/LeftPanel";
import MultiIdsModal from "../components/MultiIdsModal";
import PartiallyUpdateModal from "../components/PartiallyUpdateModal";
import RightPanel from "../components/RightPanel";
import SingleIdModal from "../components/SingleIdModal";
import UpdateModal from "../components/UpdateModal";
import MainContainer from "../styles/MainContainer";
import MainContent from "../styles/MainContent";
import items from "../utils/items";

const PageContent = ({
  t,
  locale,
  itemDetails,
  loading,
  handleSelectItem,
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
  handleFetchObjectsById,
  handleFetchSingleObjectById,
  handleAddObject,
  handleUpdateObject,
  handlePartialUpdateObject,
  handleDeleteObject,
}) => {
  useEffect(() => {
    console.log("PageContent component itemDetails updated:", itemDetails);
  }, [itemDetails]);

  return (
    <MainContainer>
      <MainContent>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("header")}</h1>
          <p className="text-lg">{t("subheader")}</p>
        </div>
        <div className="mt-10 flex w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeftPanel
            items={items}
            onSelectItem={handleSelectItem}
            locale={locale}
          />
          <RightPanel
            itemDetails={itemDetails}
            loading={loading}
            locale={locale}
          />
        </div>
      </MainContent>
      <MultiIdsModal
        open={openMultiIdsModal}
        onClose={() => setOpenMultiIdsModal(false)}
        handleFetchObjectsById={handleFetchObjectsById}
      />
      <SingleIdModal
        open={openSingleIdModal}
        onClose={() => setOpenSingleIdModal(false)}
        handleFetchSingleObjectById={handleFetchSingleObjectById}
      />
      <AddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        handleAddObject={handleAddObject}
      />
      <UpdateModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        handleUpdateObject={handleUpdateObject}
      />
      <PartiallyUpdateModal
        open={openPartiallyUpdateModal}
        onClose={() => setOpenPartiallyUpdateModal(false)}
        handlePartialUpdateObject={handlePartialUpdateObject}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        handleDeleteObject={handleDeleteObject}
      />
    </MainContainer>
  );
};

export default PageContent;
