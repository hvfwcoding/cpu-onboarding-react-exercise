import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import DeleteModal from "../app/components/DeleteModal";

jest.mock("axios");

// Mock the handleDeleteObject function
const mockHandleDeleteObject = jest.fn();
const mockOnClose = jest.fn();

describe("DeleteModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("renders and handles delete operation correctly", async () => {
    // Mocking axios delete method
    axios.delete = jest
      .fn()
      .mockResolvedValue({ data: { message: "Object deleted successfully" } });

    render(
      <DeleteModal
        open={true}
        onClose={mockOnClose}
        handleDeleteObject={mockHandleDeleteObject}
      />
    );

    const idInput = screen.getByLabelText(/object id/i);
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.change(idInput, { target: { value: "12345" } });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockHandleDeleteObject).toHaveBeenCalledWith("12345");
    });

    expect(mockHandleDeleteObject).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call delete function when ID input is empty", async () => {
    render(
      <DeleteModal
        open={true}
        onClose={mockOnClose}
        handleDeleteObject={mockHandleDeleteObject}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockHandleDeleteObject).not.toHaveBeenCalled();
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
