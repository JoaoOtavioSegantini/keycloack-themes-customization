import { createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";

const palette: PaletteOptions = {
  primary: {
    main: "#79aec8",
    contrastText: "#fff",
  },
  secondary: {
    main: "#4db5ab",
    contrastText: "#fff",
    dark: "#055a52",
  },
  background: {
    default: "#fafafa",
  },
  success: {
    main: green["500"],
    contrastText: "#fff",
  },
  error: {
    main: red["500"],
  },
};

const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      "@global": {
        "html, body, #root, #root>div": {
          height: "100%",
        },
      },
    `,
    },
  },
});

export default theme;
