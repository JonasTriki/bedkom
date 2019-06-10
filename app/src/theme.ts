import { createMuiTheme } from "@material-ui/core";
import { darkBlue, redError, yellow } from "./colors";

export default createMuiTheme({
  palette: {
    primary: { main: darkBlue },
    secondary: { main: yellow },
    error: { main: redError }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Poppins", "sans-serif"].join(",")
  }
});
