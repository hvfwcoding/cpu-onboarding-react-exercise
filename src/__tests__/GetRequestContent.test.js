import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GetRequestContent from "../app/[locale]/get-request/page-content";

jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/MultiIdsModal", () => () => (
  <div data-testid="MultiIdsModal" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));
jest.mock("../app/components/SingleIdModal", () => () => (
  <div data-testid="SingleIdModal" />
));

describe("GetRequestContent Component", () => {
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
    handleFetchObjectsById: jest.fn(),
    handleFetchSingleObjectById: jest.fn(),
    filteredItem: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ],
  };

  it("renders without crashing and displays the correct heading", () => {
    render(<GetRequestContent {...props} />);
    const heading = screen.getByText(/GET Request/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders modals and panels correctly", () => {
    render(<GetRequestContent {...props} />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
    expect(screen.getByTestId("Header")).toBeInTheDocument();
    expect(screen.getByTestId("LeftPanel")).toBeInTheDocument();
    expect(screen.getByTestId("MultiIdsModal")).toBeInTheDocument();
    expect(screen.getByTestId("RightPanel")).toBeInTheDocument();
    expect(screen.getByTestId("SingleIdModal")).toBeInTheDocument();
  });
});
