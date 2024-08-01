import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LeftPanel from "../../components/LeftPanel";
import MultiIdsInputModal from "../../components/MultiIdsModal";
import RightPanel from "../../components/RightPanel";
import SingleIdIdModal from "../../components/SingleIdModal";
import MainContainer from "../../styles/MainContainer";
import MainContent from "../../styles/MainContent";

const GetRequestContent = ({
  t,
  locale,
  itemDetails,
  loading,
  handleSelectItem,
  openMultiIdsModal,
  setOpenMultiIdsModal,
  openSingleIdModal,
  setOpenSingleIdModal,
  handleFetchObjectsById,
  handleFetchSingleObjectById,
  filteredItem,
}) => (
  <MainContainer>
    <Header locale={locale} />
    <MainContent>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">GET Request</h1>
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
    <MultiIdsInputModal
      open={openMultiIdsModal}
      onClose={() => setOpenMultiIdsModal(false)}
      handleFetchObjectsById={handleFetchObjectsById}
    />
    <SingleIdIdModal
      open={openSingleIdModal}
      onClose={() => setOpenSingleIdModal(false)}
      handleFetchSingleObjectById={handleFetchSingleObjectById}
    />
  </MainContainer>
);

export default GetRequestContent;
