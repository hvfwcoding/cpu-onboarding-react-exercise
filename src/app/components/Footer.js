"use client";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StyledAppBar from "../styles/Footer";

const Footer = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          &copy; 2024 Computershare
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Footer;
