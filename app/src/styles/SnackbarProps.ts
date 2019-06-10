import { OptionsObject } from "notistack";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";

const anchorOrigin: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center"
};
export const infoSnack: OptionsObject = {
  variant: "info",
  autoHideDuration: 1500,
  anchorOrigin
};
export const errorSnack: OptionsObject = {
  variant: "error",
  autoHideDuration: 3000,
  anchorOrigin
};
export const successSnack: OptionsObject = {
  variant: "success",
  autoHideDuration: 1500,
  anchorOrigin
};
