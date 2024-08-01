import { Button } from "@mui/material";
import { styled } from "@mui/system";

const LeftPanelContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "35vw",
  maxHeight: "calc(100vh - 20vh)",
  overflowY: "auto",
  "& > *:not(:last-child)": {
    marginBottom: "2vh",
  },
});

const ItemButton = styled(Button)({
  backgroundColor: "#639cd9",
  "&:hover": {
    backgroundColor: "#447ebf",
  },
});

export { ItemButton, LeftPanelContainer };
