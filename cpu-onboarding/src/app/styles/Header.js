"use client";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const NavList = styled("ul")({
  display: "flex",
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const NavItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0, 2),
}));

const NavLink = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "#4d424d",
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bold",
  },
}));

export { NavItem, NavLink, NavList };
