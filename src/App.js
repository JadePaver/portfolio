import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AnimatedRoutes from "./AnimatedRoutes"; // Import animated routes

const theme = createTheme({
  palette: {
    primary: { main: "#800000", dark: "#4b0000", light: "#b22222", },
    secondary: { main: "#FFFFFF", dark: "#000000", light: "#333333", },
    accent: { main: "#D7D7D7" },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "nav" },
          style: ({ theme }) => ({
            backgroundColor: "transparent",
            color: theme.palette.secondary.main,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: "4rem",
            transition: "all 0.4s ease-in-out",
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255)",
              color: theme.palette.primary.main,
            },
          }),
        },
        {
          props: { variant: "more" },
          style: ({ theme }) => ({
            backgroundColor: "transparent",
            color: theme.palette.secondary.main,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "8px 32px",
            borderRadius: "0px",
            borderLeft: `2px solid ${theme.palette.secondary.main}`,
            borderRight: `2px solid ${theme.palette.secondary.main}`,
            borderTop: "none",
            borderBottom: "none",
            transition: "all 0.4s ease-in-out",
            position: "relative",

            "&::after": {
              content: '""',
              position: "absolute",
              left: "10%",
              bottom: "10%",
              width: "0%",
              height: "2px",
              backgroundColor: theme.palette.secondary.main,
              transition: "width 0.3s ease-in-out",
            },

            "&:hover::after": {
              width: "80%",
            },
          }),
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
