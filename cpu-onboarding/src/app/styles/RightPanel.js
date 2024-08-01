import { styled } from "@mui/system";

const RightPanelContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "2vw",
  width: "65vw",
  overflowY: "auto",
});

const InformationRectangle = styled("div")({
  width: "100%",
  minHeight: "20vh",
  maxHeight: "30vh",
  padding: "1vw",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
  color: "#333",
  marginBottom: "2vh",
});

const ResultRectangle = styled("div")({
  width: "100%",
  minHeight: "55vh",
  maxHeight: "40vh",
  padding: "1vw",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "auto",
  color: "#333",
});

export { InformationRectangle, ResultRectangle, RightPanelContainer };
