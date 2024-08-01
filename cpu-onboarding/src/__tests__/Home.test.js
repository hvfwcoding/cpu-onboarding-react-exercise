import { render, screen } from "@testing-library/react";
import Home from "../app/[locale]/page";
import useModalCommonLogic from "../app/hooks/modalCommonLogic";
import initTranslations from "../app/i18n";

jest.mock("../app/i18n", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../app/hooks/modalCommonLogic", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    initTranslations.mockResolvedValue({ t: jest.fn((key) => key) });
    useModalCommonLogic.mockReturnValue({
      loading: false,
      itemDetails: [],
      openMultiIdsModal: false,
      setOpenMultiIdsModal: jest.fn(),
      openSingleIdModal: false,
      setOpenSingleIdModal: jest.fn(),
      openAddModal: false,
      setOpenAddModal: jest.fn(),
      openUpdateModal: false,
      setOpenUpdateModal: jest.fn(),
      openPartiallyUpdateModal: false,
      setOpenPartiallyUpdateModal: jest.fn(),
      openDeleteModal: false,
      setOpenDeleteModal: jest.fn(),
      handleSelectItem: jest.fn(),
      handleFetchObjectsById: jest.fn(),
      handleFetchSingleObjectById: jest.fn(),
      handleAddObject: jest.fn(),
      handleUpdateObject: jest.fn(),
      handlePartialUpdateObject: jest.fn(),
      handleDeleteObject: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<Home params={{ locale: "en" }} />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
