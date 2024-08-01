import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import PatchRequestContent from "../app/[locale]/patch-request/page-content";

jest.mock("../app/components/Footer", () => () => <div data-testid="Footer" />);
jest.mock("../app/components/Header", () => () => <div data-testid="Header" />);
jest.mock("../app/components/LeftPanel", () => () => (
  <div data-testid="LeftPanel" />
));
jest.mock("../app/components/PartiallyUpdateModal", () => () => (
  <div data-testid="PartiallyUpdateModal" />
));
jest.mock("../app/components/RightPanel", () => () => (
  <div data-testid="RightPanel" />
));

describe("PatchRequestContent Component", () => {
  const props = {
    t: jest.fn((key) => key),
    locale: "en",
    itemDetails: [],
    loading: false,
    handleSelectItem: jest.fn(),
    openPartiallyUpdateModal: false,
    setOpenPartiallyUpdateModal: jest.fn(),
    handlePartialUpdateObject: jest.fn(),
    setItemDetails: jest.fn(),
    filteredItem: [{ id: 6, name: "Item 6" }],
  };

  it("renders without crashing and displays the correct heading", () => {
    render(<PatchRequestContent {...props} />);
    const heading = screen.getByText(/PATCH Request/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders modals and panels correctly", () => {
    render(<PatchRequestContent {...props} />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
    expect(screen.getByTestId("Header")).toBeInTheDocument();
    expect(screen.getByTestId("LeftPanel")).toBeInTheDocument();
    expect(screen.getByTestId("PartiallyUpdateModal")).toBeInTheDocument();
    expect(screen.getByTestId("RightPanel")).toBeInTheDocument();
  });
});
