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

const SingleIdModal = ({ open, onClose, handleFetchSingleObjectById }) => {
  const [idInput, setIdInput] = useState("");

  const handleSubmitClick = async () => {
    await handleFetchSingleObjectById(idInput);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{ textAlign: "center", marginTop: "3vh", color: "#b3b3bd" }}
      >
        Enter Object ID
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          id="idInput"
          name="idInput"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          label="Single ID"
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
          Fetch Object
        </DialogSubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default SingleIdModal;
