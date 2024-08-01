import AddObjectModal from "../../components/AddModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";
import MainContainer from "../../styles/MainContainer";
import MainContent from "../../styles/MainContent";

const PostRequestContent = ({
  t,
  locale,
  itemDetails,
  loading,
  handleSelectItem,
  openAddModal,
  setOpenAddModal,
  handleAddObject,
  filteredItem,
}) => (
  <MainContainer>
    <Header locale={locale} />
    <MainContent>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">POST Request</h1>
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
    <AddObjectModal
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
      handleAddObject={handleAddObject}
    />
  </MainContainer>
);

export default PostRequestContent;
