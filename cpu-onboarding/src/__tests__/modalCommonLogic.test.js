import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useModalCommonLogic from "../app/hooks/modalCommonLogic";

describe("useModalCommonLogic", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should initialize state correctly", () => {
    const { result } = renderHook(() => useModalCommonLogic());

    expect(result.current.loading).toBe(false);
    expect(result.current.itemDetails).toBeNull();
    expect(result.current.selectedItem).toBeNull();
    expect(result.current.openMultiIdsModal).toBe(false);
    expect(result.current.openSingleIdModal).toBe(false);
    expect(result.current.openAddModal).toBe(false);
    expect(result.current.openUpdateModal).toBe(false);
    expect(result.current.openPartiallyUpdateModal).toBe(false);
    expect(result.current.openDeleteModal).toBe(false);
  });

  it("should fetch item details and update state", async () => {
    const mockData = { id: 1, name: "Item 1" };
    mock.onGet("https://api.restful-api.dev/objects").reply(200, mockData);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleSelectItem(1);
    });

    expect(result.current.itemDetails).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it("should handle errors during fetching item details", async () => {
    mock.onGet("https://api.restful-api.dev/objects").reply(500);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleSelectItem(1);
    });

    expect(result.current.itemDetails).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle selecting different items correctly", async () => {
    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleSelectItem(2);
    });

    expect(result.current.openMultiIdsModal).toBe(true);

    await act(async () => {
      await result.current.handleSelectItem(3);
    });

    expect(result.current.openSingleIdModal).toBe(true);
  });

  it("should add a new object and update state", async () => {
    const newObjectData = { name: "New Object" };
    const mockData = { id: 1, ...newObjectData };
    mock
      .onPost("https://api.restful-api.dev/objects", newObjectData)
      .reply(200, mockData);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleAddObject(newObjectData);
    });

    expect(result.current.itemDetails).toEqual(mockData);
  });

  it("should handle update object and update state", async () => {
    const updatedData = { name: "Updated Object" };
    const mockData = { id: 1, ...updatedData };
    mock
      .onPut("https://api.restful-api.dev/objects/1", updatedData)
      .reply(200, mockData);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleUpdateObject(1, updatedData);
    });

    expect(result.current.itemDetails).toEqual(mockData);
  });

  it("should handle partial update object and update state", async () => {
    const partialUpdatedData = { name: "Partially Updated Object" };
    const mockData = { id: 1, ...partialUpdatedData };
    mock
      .onPatch("https://api.restful-api.dev/objects/1", partialUpdatedData)
      .reply(200, mockData);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handlePartialUpdateObject(1, partialUpdatedData);
    });

    expect(result.current.itemDetails).toEqual(mockData);
  });

  it("should handle delete object and update state", async () => {
    const mockData = { message: "Deleted successfully" };
    mock.onDelete("https://api.restful-api.dev/objects/1").reply(200, mockData);

    const { result } = renderHook(() => useModalCommonLogic());

    await act(async () => {
      await result.current.handleDeleteObject(1);
    });

    expect(result.current.itemDetails).toEqual({
      message: "Deleted successfully",
    });
  });
});
