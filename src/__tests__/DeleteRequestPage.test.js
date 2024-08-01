import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import DeleteRequestPage from "../app/[locale]/delete-request/page";
import useModalCommonLogic from "../app/hooks/modalCommonLogic";

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
jest.mock("../app/utils/items", () => [{ id: 7, name: "Item 7" }]);

describe("DeleteRequestPage Component", () => {
  beforeEach(() => {
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openDeleteModal: false,
      setOpenDeleteModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handleDeleteObject: jest.fn(),
      setItemDetails: jest.fn(),
    });
  });

  it("renders without crashing", async () => {
    render(<DeleteRequestPage params={{ locale: "en" }} />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /DELETE Request/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
