import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const CancelButton = styled(Button)({
  color: "#639cd9",
  marginBottom: "2vh",
  marginRight: "2vh",
});

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#b3b3bd",
    },
  },
});

export const DialogSubmitButton = styled(Button)({
  backgroundColor: "#639cd9",
  marginBottom: "2vh",
  marginRight: "2vh",
  "&:hover": {
    backgroundColor: "#447ebf",
  },
});

export const StyledAppBar = styled(AppBar)({
  backgroundColor: "#e1dfba",
  alignItems: "center",
  justifyContent: "center",
});
