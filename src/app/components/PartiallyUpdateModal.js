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

const PartiallyUpdateModal = ({ open, onClose, handlePartialUpdateObject }) => {
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
      const { id, name, data } = itemDetails;
      setUpdateFormData((prevData) => ({
        ...prevData,
        id,
        name,
        ...data,
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
      const updatedData = {
        id: updateFormData.id,
        name: updateFormData.name,
        ...updateFormData,
        price: Number(updateFormData.price),
        year: Number(updateFormData.year),
      };

      await handlePartialUpdateObject(updateFormData.id, updatedData);

      setUpdateFormData(initialFormData);
      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Error partially updating object:",
        error.response ? error.response.data : error.message
      );
      setItemDetails(
        error.response ? error.response.data : { error: error.message }
      );
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Partially Update Object</DialogTitle>
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
              Partially Update Object
            </DialogSubmitButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PartiallyUpdateModal;
