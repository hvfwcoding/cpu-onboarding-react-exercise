import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import GetRequestPage from "../app/[locale]/get-request/page";
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
jest.mock("../app/utils/items", () => [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
]);

describe("GetRequestPage Component", () => {
  beforeEach(() => {
    initTranslations.mockResolvedValue({ t: jest.fn((key) => key) });
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openMultiIdsModal: false,
      setOpenMultiIdsModal: jest.fn(),
      openSingleIdModal: false,
      setOpenSingleIdModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handleFetchObjectsById: jest.fn(),
      handleFetchSingleObjectById: jest.fn(),
    });
  });

  it("renders without crashing", async () => {
    render(<GetRequestPage params={{ locale: "en" }} />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /GET Request/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
