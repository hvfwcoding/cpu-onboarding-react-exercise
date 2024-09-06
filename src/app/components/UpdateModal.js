import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import useModalCommonLogic from "../hooks/useModalLogic";
import {
  CancelButton,
  CustomTextField,
  DialogSubmitButton,
} from "../styles/StyledComponents";

const UpdateModal = ({ open, onClose, handleUpdateObject }) => {
  const { itemDetails, setItemDetails } = useModalCommonLogic();
  const initialFormData = {
    id: "",
    name: "",
    color: "",
    capacity: "",
    price: "",
    generation: "",
    year: "",
    "CPU model": "",
    "Hard disk size": "",
    "Strap Colour": "",
    "Case Size": "",
    Description: "",
    "Screen size": "",
  };
  const [updateFormData, setUpdateFormData] = useState(initialFormData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setUpdateFormData(initialFormData);
    setCurrentPage(1);
  }, [open]);

  useEffect(() => {
    if (itemDetails) {
      setUpdateFormData((prevData) => ({
        ...prevData,
        ...itemDetails.data,
        name: itemDetails.name,
      }));
      setCurrentPage(2);
    }
  }, [itemDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFetchExistingObjectClick = async () => {
    try {
      const response = await axios.get(
        `https://api.restful-api.dev/objects/${updateFormData.id}`
      );
      setItemDetails(response.data);
      setCurrentPage(2);
    } catch (error) {
      console.error(
        "Error fetching existing object details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmitClick = async () => {
    try {
      const updateData = {
        id: updateFormData.id,
        name: updateFormData.name,
        data: {
          color: updateFormData.color,
          capacity: updateFormData.capacity,
          price: Number(updateFormData.price),
          generation: updateFormData.generation,
          year: Number(updateFormData.year),
          "CPU model": updateFormData["CPU model"],
          "Hard disk size": updateFormData["Hard disk size"],
          "Strap Colour": updateFormData["Strap Colour"],
          "Case Size": updateFormData["Case Size"],
          Description: updateFormData.Description,
          "Screen size": updateFormData["Screen size"],
        },
      };

      await handleUpdateObject(updateFormData.id, updateData);
      setUpdateFormData(initialFormData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error updating object:", error);
      setItemDetails({ error: error.message });
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Object</DialogTitle>
      <DialogContent>
        {currentPage === 1 ? (
          <CustomTextField
            id="id"
            name="id"
            value={updateFormData.id}
            onChange={handleInputChange}
            label="ID"
            fullWidth
            variant="outlined"
            margin="normal"
          />
        ) : (
          Object.keys(initialFormData).map((key) => (
            <CustomTextField
              key={key}
              id={key}
              name={key}
              value={updateFormData[key]}
              onChange={handleInputChange}
              label={key}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={
                key === "id" ? { readOnly: true, disabled: true } : {}
              }
            />
          ))
        )}
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        {currentPage === 1 ? (
          <DialogSubmitButton
            onClick={handleFetchExistingObjectClick}
            color="primary"
            variant="contained"
          >
            Next
          </DialogSubmitButton>
        ) : (
          <>
            <CancelButton onClick={() => setCurrentPage(1)}>Back</CancelButton>
            <DialogSubmitButton
              onClick={handleSubmitClick}
              color="primary"
              variant="contained"
            >
              Update Object
            </DialogSubmitButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
