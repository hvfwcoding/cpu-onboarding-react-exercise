import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import PostRequestContent from "../app/[locale]/post-request/page-content";

jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/AddModal", () => () => (
  <div data-testid="AddModal" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));

describe("PostRequestContent Component", () => {
  const props = {
    t: jest.fn((key) => key),
    locale: "en",
    itemDetails: [],
    loading: false,
    handleSelectItem: jest.fn(),
    openAddModal: false,
    setOpenAddModal: jest.fn(),
    handleAddObject: jest.fn(),
    filteredItem: [{ id: 4, name: "Item 4" }],
  };

  it("renders without crashing and displays the correct heading", () => {
    render(<PostRequestContent {...props} />);
    const heading = screen.getByText(/POST Request/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders modals and panels correctly", () => {
    render(<PostRequestContent {...props} />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
    expect(screen.getByTestId("Header")).toBeInTheDocument();
    expect(screen.getByTestId("LeftPanel")).toBeInTheDocument();
    expect(screen.getByTestId("AddModal")).toBeInTheDocument();
    expect(screen.getByTestId("RightPanel")).toBeInTheDocument();
  });
});
