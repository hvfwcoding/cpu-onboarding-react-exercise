import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import PatchRequestPage from "../app/[locale]/patch-request/page";
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
jest.mock("../app/utils/items", () => [{ id: 6, name: "Item 6" }]);

describe("PatchRequestPage Component", () => {
  beforeEach(() => {
    initTranslations.mockResolvedValue({ t: jest.fn((key) => key) });
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openPartiallyUpdateModal: false,
      setOpenPartiallyUpdateModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handlePartialUpdateObject: jest.fn(),
      setItemDetails: jest.fn(),
    });
  });

  it("renders without crashing and displays the correct heading", async () => {
    render(<PatchRequestPage params={{ locale: "en" }} />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /PATCH Request/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
