import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";

export const theme = createTheme({
  palette: {
    default: {
      main: "#adbac7",
    },
    active: {
      main: "#adbac7",
      contrastText: "#22272e",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 15,
  },
});

export const DownloadButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "600",
  backgroundColor: "var(--btn-download-color)",
  "&:hover": {
    backgroundColor: "var(--btn-download-hover-color)",
  },
}));

export const DownloadSnackbar = styled(Alert)(({ theme }) => ({
  color: "white",
  fontSize: "1rem",
  backgroundColor: "var(--btn-download-color)",
}));
