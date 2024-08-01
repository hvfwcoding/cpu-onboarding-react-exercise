import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#4d424d",
  color: "white",
  textAlign: "center",
  padding: (theme) => theme.spacing(2),
  marginTop: (theme) => theme.spacing(2),
});

export default StyledAppBar;
