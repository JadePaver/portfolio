import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FD6F00",
    },
    secondary: {
      main: "#FFFFFF",
    },
    info: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
