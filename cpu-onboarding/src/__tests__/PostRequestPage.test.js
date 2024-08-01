import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import PostRequestPage from "../app/[locale]/post-request/page";
import useModalCommonLogic from "../app/hooks/modalCommonLogic";
import initTranslations from "../app/i18n";

jest.mock("../app/i18n", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    t: (key) => key, // Simple mock function for translation
  }),
}));
jest.mock("../app/hooks/modalCommonLogic", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../app/utils/items", () => [{ id: 4, name: "Item 4" }]);

describe("PostRequestPage Component", () => {
  beforeEach(() => {
    initTranslations.mockResolvedValue({ t: jest.fn((key) => key) });
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openAddModal: false,
      setOpenAddModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handleAddObject: jest.fn(),
    });
  });

  it("renders without crashing and displays the correct heading", async () => {
    render(<PostRequestPage params={{ locale: "en" }} />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", {
        level: 1,
        name: /POST Request/i,
      });
      expect(heading).toBeInTheDocument();
    });
  });
});
