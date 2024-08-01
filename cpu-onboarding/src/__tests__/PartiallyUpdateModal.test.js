import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PartiallyUpdateModal from "../app/components/PartiallyUpdateModal";

jest.mock("axios");

// Mock the handlePartialUpdateObject function
const mockHandlePartialUpdateObject = jest.fn();

describe("PartiallyUpdateModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("should call handlePartialUpdateObject with correct data on successful PATCH request", async () => {
    axios.get.mockResolvedValue({
      data: { id: "123", name: "Test Object", data: {} },
    });

    render(
      <PartiallyUpdateModal
        open={true}
        onClose={() => {}}
        handlePartialUpdateObject={mockHandlePartialUpdateObject}
      />
    );

    // Simulate user input and interaction
    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.restful-api.dev/objects/123"
      );
    });

    // Simulate successful PATCH request
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: "2024" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Partially Update Object/i })
    );

    await waitFor(() => {
      expect(mockHandlePartialUpdateObject).toHaveBeenCalledWith(
        "123",
        expect.objectContaining({
          id: "123",
          price: 100,
          year: 2024,
        })
      );
    });
  });

  it("should handle errors during the update process", async () => {
    const mockHandlePartialUpdateObject = jest.fn();
    axios.get.mockRejectedValue(new Error("Update failed"));

    render(
      <PartiallyUpdateModal
        open={true}
        onClose={() => {}}
        handlePartialUpdateObject={mockHandlePartialUpdateObject}
      />
    );

    // Simulate user interaction
    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Simulate the error scenario
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Wait for the error to be handled
    await waitFor(() => {
      expect(mockHandlePartialUpdateObject).not.toHaveBeenCalled();
    });
  });
});
