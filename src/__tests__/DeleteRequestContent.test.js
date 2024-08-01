import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DeleteRequestContent from "../app/[locale]/delete-request/page-content";

jest.mock("../app/components/DeleteModal", () => () => (
  <div data-testid="DeleteModal" />
));
jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));

describe("DeleteRequestContent Component", () => {
  const props = {
    t: jest.fn((key) => key),
    locale: "en",
    itemDetails: [],
    loading: false,
    handleSelectItem: jest.fn(),
    handleDeleteObject: jest.fn(),
    setItemDetails: jest.fn(),
    filteredItem: [{ id: 7, name: "Item 7" }],
    openDeleteModal: false,
    setOpenDeleteModal: jest.fn(),
  };

  it("renders without crashing", () => {
    render(<DeleteRequestContent {...props} />);
    const header = screen.getByTestId("Header");
    expect(header).toBeInTheDocument();
  });

  it("renders modals correctly", () => {
    render(<DeleteRequestContent {...props} />);
    expect(screen.getByTestId("DeleteModal")).toBeInTheDocument();
  });

  it("renders filtered items in LeftPanel", () => {
    render(<DeleteRequestContent {...props} />);
    const leftPanel = screen.getByTestId("LeftPanel");
    expect(leftPanel).toBeInTheDocument();
  });
});
