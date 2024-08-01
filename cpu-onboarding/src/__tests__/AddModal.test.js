import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import AddModal from "../app/components/AddModal";

jest.mock("axios");

// Mock the handleAddObject function
const mockHandleAddObject = jest.fn();
const mockClose = jest.fn();

describe("AddModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("should call handleAddObject with correct data on successful POST request", async () => {
    // Mock the axios POST request
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 1,
        name: "Test Object",
        data: {
          year: 2024,
          price: 500,
          "CPU model": "Intel i7",
          "Hard disk size": "1TB",
        },
      },
    });

    render(
      <AddModal
        open={true}
        onClose={mockClose}
        handleAddObject={mockHandleAddObject}
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test Object" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2024" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/CPU Model/i), {
      target: { value: "Intel i7" },
    });
    fireEvent.change(screen.getByLabelText(/Hard Disk Size/i), {
      target: { value: "1TB" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Add Object/i));

    // Wait for the axios request to complete and assertions
    await waitFor(() => {
      expect(mockHandleAddObject).toHaveBeenCalledWith({
        name: "Test Object",
        data: {
          year: 2024,
          price: 500,
          "CPU model": "Intel i7",
          "Hard disk size": "1TB",
        },
      });
    });

    expect(mockClose).toHaveBeenCalled();
  });
});
