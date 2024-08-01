import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import PutRequestPage from "../app/[locale]/put-request/page";
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
jest.mock("../app/utils/items", () => [{ id: 5, name: "Item 5" }]);

describe("PutRequestPage Component", () => {
  beforeEach(() => {
    initTranslations.mockResolvedValue({ t: jest.fn((key) => key) });
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openUpdateModal: false,
      setOpenUpdateModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handleUpdateObject: jest.fn(),
      setItemDetails: jest.fn(),
    });
  });

  it("renders without crashing and displays the correct heading", async () => {
    render(<PutRequestPage params={{ locale: "en" }} />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /PUT Request/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
