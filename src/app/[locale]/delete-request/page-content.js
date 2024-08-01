import DeleteObjectModal from "../../components/DeleteModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";
import MainContainer from "../../styles/MainContainer";
import MainContent from "../../styles/MainContent";

const DeleteRequestContent = ({
  t,
  locale,
  itemDetails,
  loading,
  handleSelectItem,
  handleDeleteObject,
  setItemDetails,
  filteredItem,
  openDeleteModal,
  setOpenDeleteModal,
}) => (
  <MainContainer>
    <Header locale={locale} />
    <MainContent>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">DELETE Request</h1>
        <p className="text-lg">{t("subheader")}</p>
      </div>
      <div className="mt-10 flex w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeftPanel
          items={filteredItem}
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
    <Footer />
    <DeleteObjectModal
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
      handleDeleteObject={handleDeleteObject}
      setItemDetails={setItemDetails}
    />
  </MainContainer>
);

export default DeleteRequestContent;
