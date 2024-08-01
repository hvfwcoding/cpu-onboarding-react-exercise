import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import {
  CancelButton,
  CustomTextField,
  DialogSubmitButton,
} from "../styles/StyledComponents";

const AddModal = ({ open, onClose, handleAddObject }) => {
  const [newObjectName, setNewObjectName] = useState("");
  const [newObjectYear, setNewObjectYear] = useState("");
  const [newObjectPrice, setNewObjectPrice] = useState("");
  const [newObjectCPU, setNewObjectCPU] = useState("");
  const [newObjectHardDisk, setNewObjectHardDisk] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setNewObjectName(value);
        break;
      case "year":
        setNewObjectYear(value);
        break;
      case "price":
        setNewObjectPrice(value);
        break;
      case "cpu":
        setNewObjectCPU(value);
        break;
      case "hardDisk":
        setNewObjectHardDisk(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitClick = async () => {
    try {
      const newObjectData = {
        name: newObjectName,
        data: {
          year: Number(newObjectYear),
          price: Number(newObjectPrice),
          "CPU model": newObjectCPU,
          "Hard disk size": newObjectHardDisk,
        },
      };

      await handleAddObject(newObjectData);

      setNewObjectName("");
      setNewObjectYear("");
      setNewObjectPrice("");
      setNewObjectCPU("");
      setNewObjectHardDisk("");

      onClose();
    } catch (error) {
      console.error("Error adding new object:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{ textAlign: "center", marginTop: "3vh", color: "#7f7e90" }}
      >
        Add New Object
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          id="objectName"
          name="name"
          value={newObjectName}
          onChange={handleInputChange}
          label="Name"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <CustomTextField
          id="objectYear"
          name="year"
          value={newObjectYear}
          onChange={handleInputChange}
          label="Year"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <CustomTextField
          id="objectPrice"
          name="price"
          value={newObjectPrice}
          onChange={handleInputChange}
          label="Price"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <CustomTextField
          id="objectCPU"
          name="cpu"
          value={newObjectCPU}
          onChange={handleInputChange}
          label="CPU Model"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <CustomTextField
          id="objectHardDisk"
          name="hardDisk"
          value={newObjectHardDisk}
          onChange={handleInputChange}
          label="Hard Disk Size"
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} color="primary">
          Cancel
        </CancelButton>
        <DialogSubmitButton
          onClick={handleSubmitClick}
          color="primary"
          variant="contained"
        >
          Add Object
        </DialogSubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
