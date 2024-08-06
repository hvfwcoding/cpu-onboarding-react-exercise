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

const DeleteModal = ({ open, onClose, handleDeleteObject }) => {
  const [idInput, setIdInput] = useState("");

  const handleSubmitClick = async () => {
    if (!idInput) {
      onClose();
      return;
    }

    try {
      console.log(`Attempting to delete object with ID: ${idInput}`);
      await handleDeleteObject(idInput);
      setIdInput("");
      onClose();
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{ textAlign: "center", marginTop: "3vh", color: "#b3b3bd" }}
      >
        Delete Object
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          id="idInput"
          name="idInput"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          label="Object ID"
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
          Delete
        </DialogSubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
