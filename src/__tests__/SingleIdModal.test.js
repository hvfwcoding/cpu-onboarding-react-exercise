import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SingleIdModal from "../app/components/SingleIdModal";

jest.mock("axios");

// Mock the handleFetchObjectById function
const mockHandleFetchObjectById = jest.fn();
const mockClose = jest.fn();
describe("SingleIdModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("should call handleFetchSingleObjectById with correct data on button click", async () => {
    render(
      <SingleIdModal
        open={true}
        onClose={mockClose}
        handleFetchSingleObjectById={mockHandleFetchObjectById}
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Single ID/i), {
      target: { value: "1" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Fetch Object/i));

    // Wait for the axios request to complete and assertions
    await waitFor(() => {
      expect(mockHandleFetchObjectById).toHaveBeenCalledWith("1");
    });

    expect(mockHandleFetchObjectById).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
