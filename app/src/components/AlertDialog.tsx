import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Button} from "../styles/Button";
import {FormattedMessage} from "react-intl";

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  title: string;
  description: string;
  yesMessage: string;
  yesAction: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({open, setOpen, title, description, yesMessage, yesAction}) => {
  const handleClose = () => setOpen(false);
  const handleYesAction = () => {
    handleClose();
    yesAction();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} theme='white'>
          <FormattedMessage
            id='alert.dialog.cancel'
            defaultMessage='Avbryt'
          />
        </Button>
        <Button onClick={handleYesAction} theme='white'>
          {yesMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;