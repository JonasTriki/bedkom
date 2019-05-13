import * as React from "react";
import {Dialog} from "@material-ui/core";
import DialogTitle from "../styles/DialogTitle";

interface FormDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

const FormDialog: React.FC<FormDialogProps> = ({open, onClose, title, children}) => {

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      scroll='paper'
    >
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default FormDialog;