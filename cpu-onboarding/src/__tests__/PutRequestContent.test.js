import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import PutRequestContent from "../app/[locale]/put-request/page-content";

jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/UpdateModal", () => () => (
  <div data-testid="UpdateModal" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));

describe("PutRequestContent Component", () => {
  const props = {
    t: jest.fn((key) => key),
    locale: "en",
    itemDetails: [],
    loading: false,
    handleSelectItem: jest.fn(),
    openUpdateModal: false,
    setOpenUpdateModal: jest.fn(),
    handleUpdateObject: jest.fn(),
    setItemDetails: jest.fn(),
    filteredItem: [{ id: 5, name: "Item 5" }],
  };

  it("renders without crashing and displays the correct heading", () => {
    render(<PutRequestContent {...props} />);
    const heading = screen.getByText(/PUT Request/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders modals and panels correctly", () => {
    render(<PutRequestContent {...props} />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
    expect(screen.getByTestId("Header")).toBeInTheDocument();
    expect(screen.getByTestId("LeftPanel")).toBeInTheDocument();
    expect(screen.getByTestId("UpdateModal")).toBeInTheDocument();
    expect(screen.getByTestId("RightPanel")).toBeInTheDocument();
  });
});
