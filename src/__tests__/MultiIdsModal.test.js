import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultiIdsModal from "../app/components/MultiIdsModal";

jest.mock("axios");

// Mock the handleFetchObjectsById function
const mockHandleFetchObjectsById = jest.fn();
const mockClose = jest.fn();

describe("MultiIdsModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("should call handleFetchObjectsById with correct data on button click", async () => {
    render(
      <MultiIdsModal
        open={true}
        onClose={mockClose}
        handleFetchObjectsById={mockHandleFetchObjectsById}
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/IDs \(comma-separated\)/i), {
      target: { value: "1, 2" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Fetch Objects/i));

    // Wait for the axios request to complete and assertions
    await waitFor(() => {
      expect(mockHandleFetchObjectsById).toHaveBeenCalledWith("1, 2");
    });

    expect(mockHandleFetchObjectsById).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
