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

const MultiIdsModal = ({ open, onClose, handleFetchObjectsById }) => {
  const [idInput, setIdInput] = useState("");

  const handleSubmitClick = async () => {
    await handleFetchObjectsById(idInput);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{ textAlign: "center", marginTop: "3vh", color: "#7f7e90" }}
      >
        Enter Object IDs
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          id="idInput"
          name="idInput"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          label="IDs (comma-separated)"
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
          Fetch Objects
        </DialogSubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default MultiIdsModal;
