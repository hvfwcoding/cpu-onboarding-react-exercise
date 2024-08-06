import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import PageContent from "../../app/[locale]/page-content";

jest.mock("../app/components/AddModal", () => () => (
  <div data-testid="AddModal" />
));
jest.mock("../app/components/DeleteModal", () => () => (
  <div data-testid="DeleteModal" />
));
jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/MultiIdsModal", () => () => (
  <div data-testid="MultiIdsModal" />
));
jest.mock("../app/components/PartiallyUpdateModal", () => () => (
  <div data-testid="PartiallyUpdateModal" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));
jest.mock("../app/components/SingleIdModal", () => () => (
  <div data-testid="SingleIdModal" />
));
jest.mock("../app/components/UpdateModal", () => () => (
  <div data-testid="UpdateModal" />
));

describe("PageContent Component", () => {
  const props = {
    t: jest.fn((key) => key),
    locale: "en",
    itemDetails: [],
    loading: false,
    handleSelectItem: jest.fn(),
    openMultiIdsModal: false,
    setOpenMultiIdsModal: jest.fn(),
    openSingleIdModal: false,
    setOpenSingleIdModal: jest.fn(),
    openAddModal: false,
    setOpenAddModal: jest.fn(),
    openUpdateModal: false,
    setOpenUpdateModal: jest.fn(),
    openPartiallyUpdateModal: false,
    setOpenPartiallyUpdateModal: jest.fn(),
    openDeleteModal: false,
    setOpenDeleteModal: jest.fn(),
    handleFetchObjectsById: jest.fn(),
    handleFetchSingleObjectById: jest.fn(),
    handleAddObject: jest.fn(),
    handleUpdateObject: jest.fn(),
    handlePartialUpdateObject: jest.fn(),
    handleDeleteObject: jest.fn(),
  };

  it("renders without crashing", () => {
    render(<PageContent {...props} />);
    const header = screen.getByTestId("Header");
    expect(header).toBeInTheDocument();
  });

  it("renders modals correctly", () => {
    render(<PageContent {...props} />);
    expect(screen.getByTestId("AddModal")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteModal")).toBeInTheDocument();
    expect(screen.getByTestId("MultiIdsModal")).toBeInTheDocument();
    expect(screen.getByTestId("PartiallyUpdateModal")).toBeInTheDocument();
    expect(screen.getByTestId("SingleIdModal")).toBeInTheDocument();
    expect(screen.getByTestId("UpdateModal")).toBeInTheDocument();
  });
});
