import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UpdateModal from "../app/components/UpdateModal";

jest.mock("axios");

// Mock the handleUpdateObject function
const mockHandleUpdateObject = jest.fn();

describe("UpdateModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it("should call handleUpdateObject with correct data on successful PUT request", async () => {
    axios.get.mockResolvedValue({
      data: { id: "123", name: "Test Object", data: {} },
    });
    axios.put.mockResolvedValue({
      data: {
        id: "123",
        name: "Test Object",
        data: {
          price: 100,
          year: 2024,
        },
      },
    });

    render(
      <UpdateModal
        open={true}
        onClose={() => {}}
        handleUpdateObject={mockHandleUpdateObject}
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

    // Simulate user input for update
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: "2024" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update Object/i }));

    await waitFor(() => {
      expect(mockHandleUpdateObject).toHaveBeenCalledWith("123", {
        id: "123",
        name: "Test Object",
        data: {
          color: "",
          capacity: "",
          price: 100,
          generation: "",
          year: 2024,
          "CPU model": "",
          "Hard disk size": "",
          "Strap Colour": "",
          "Case Size": "",
          Description: "",
          "Screen size": "",
        },
      });
    });
  });

  it("should handle errors during the update process", async () => {
    const mockHandleUpdateObject = jest.fn();
    axios.get.mockRejectedValue(new Error("Update failed"));

    render(
      <UpdateModal
        open={true}
        onClose={() => {}}
        handleUpdateObject={mockHandleUpdateObject}
      />
    );

    // Simulate user input and interaction
    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    });

    // Simulate the error scenario
    await waitFor(() => {
      expect(mockHandleUpdateObject).not.toHaveBeenCalled();
    });
  });
});
