import axios from "axios";
import { useState } from "react";

const useModalCommonLogic = () => {
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMultiIdsModal, setOpenMultiIdsModal] = useState(false);
  const [openSingleIdModal, setOpenSingleIdModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openPartiallyUpdateModal, setOpenPartiallyUpdateModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchItemDetails = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.restful-api.dev${endpoint}`
      );
      console.log("Fetched item details:", response.data);
      setItemDetails(response.data);
      console.log("Updated itemDetails state:", response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setItemDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = async (itemId) => {
    setSelectedItem(itemId);
    setItemDetails(null);
    let endpoint = "";
    switch (itemId) {
      case 1:
        // this is fetching all the objects from the endpoint where
        // it does not have a modal
        endpoint = "/objects";
        break;
      case 2:
        setOpenMultiIdsModal(true);
        break;
      case 3:
        setOpenSingleIdModal(true);
        break;
      case 4:
        setOpenAddModal(true);
        break;
      case 5:
        setOpenUpdateModal(true);
        break;
      case 6:
        setOpenPartiallyUpdateModal(true);
        break;
      case 7:
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
    if (endpoint) {
      await fetchItemDetails(endpoint);
    }
  };

  const handleFetchObjectsById = async (idInput) => {
    if (!idInput) return;

    const ids = idInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id)
      .join("&id=");
    const endpoint = `/objects?id=${ids}`;

    console.log("Fetching items from endpoint:", endpoint);

    await fetchItemDetails(endpoint);
  };

  const handleFetchSingleObjectById = async (idInput) => {
    if (!idInput) return;

    const endpoint = `/objects/${idInput}`;

    console.log("Fetching item from endpoint:", endpoint);

    await fetchItemDetails(endpoint);
  };

  const handleAddObject = async (newObjectData) => {
    try {
      const response = await axios.post(
        "https://api.restful-api.dev/objects",
        newObjectData
      );
      console.log("Added object:", response.data);
      setItemDetails(response.data);
    } catch (error) {
      console.error("Error adding new object:", error);
      throw error;
    }
  };

  const handleUpdateObject = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `https://api.restful-api.dev/objects/${id}`,
        updatedData
      );
      console.log("Updated object:", response.data);
      setItemDetails(response.data);
    } catch (error) {
      console.error("Error during update request:", error);
      throw error;
    }
  };

  const handlePartialUpdateObject = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://api.restful-api.dev/objects/${id}`,
        updatedData
      );
      console.log("Partially updated object:", response.data);
      setItemDetails(response.data);
    } catch (error) {
      console.error("Error during partial update request:", error);
      throw error;
    }
  };

  const handleDeleteObject = async (deletedObjectId) => {
    if (!deletedObjectId) return;

    const endpoint = `/objects/${deletedObjectId}`;

    try {
      const response = await axios.delete(
        `https://api.restful-api.dev${endpoint}`
      );
      console.log("Deleted object with ID:", deletedObjectId);
      setItemDetails({ message: response.data.message });
    } catch (error) {
      console.error("Error deleting object:", error);
      setItemDetails(null);
    }
  };

  return {
    loading,
    itemDetails,
    setItemDetails,
    selectedItem,
    openMultiIdsModal,
    setOpenMultiIdsModal,
    openSingleIdModal,
    setOpenSingleIdModal,
    openAddModal,
    setOpenAddModal,
    openUpdateModal,
    setOpenUpdateModal,
    openPartiallyUpdateModal,
    setOpenPartiallyUpdateModal,
    openDeleteModal,
    setOpenDeleteModal,
    handleSelectItem,
    handleFetchObjectsById,
    handleFetchSingleObjectById,
    handleAddObject,
    handleUpdateObject,
    handlePartialUpdateObject,
    handleDeleteObject,
  };
};

export default useModalCommonLogic;
