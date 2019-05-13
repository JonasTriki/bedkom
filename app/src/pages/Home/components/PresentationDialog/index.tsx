import * as React from "react";
import {injectIntl} from "react-intl";
import messages from "./messages";
import {useState} from "react";
import {Presentation} from "../../../../models/Presentation";
import FormDialog from "../../../../components/FormDialog";
import globalMessages from "../../../../translations/global";
import {DialogContent} from "../../../../styles/DialogContent";
import {DialogActions} from "@material-ui/core";
import {Button} from "../../../../styles/Button";
import {errorSnack, successSnack} from "../../../../styles/SnackbarProps";
import {useSnackbar} from "notistack";
import {registrationsRegister} from "../../../../api/endpoints";

interface PresentationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  presentation: Presentation | undefined;
}

const PresentationDialog = injectIntl<PresentationDialogProps>(({intl, presentation, ...props}) => {
  const {enqueueSnackbar} = useSnackbar();

  const [food, setFood] = useState('');
  const [loading, setLoading] = useState(false);

  const companyName = (presentation && presentation.company)
    ? presentation.company.name
    : intl.formatMessage(globalMessages.unknown);


  const register = async () => {
    if (loading || !presentation) return;
    setLoading(true);

    // Call API to create the registration. Also, check for errors.
    const response = await registrationsRegister(presentation.id);
    if (!response || response.status !== 200) {
      enqueueSnackbar(intl.formatMessage(messages.errorRegistering), errorSnack);
      setLoading(false);
      return;
    }

    // Signed up to company presentation successfully.
    enqueueSnackbar(intl.formatMessage(messages.successfullyRegistered, {company: companyName}), successSnack);
    setLoading(false);
    onClose();
  };

  const onClose = () => props.setOpen(false);

  return (
    <FormDialog
      open={props.open}
      onClose={onClose}
      title={intl.formatMessage(messages.title, {company: companyName})}
    >
      <DialogContent>
        {presentation ? (
          presentation.description
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} theme='white'>
          {intl.formatMessage(globalMessages.cancel)}
        </Button>
        <Button onClick={register} theme='white'>
          {loading ? (
            intl.formatMessage(globalMessages.loading)
          ) : (
            intl.formatMessage(messages.register)
          )}
        </Button>
      </DialogActions>
    </FormDialog>
  )
});

export default PresentationDialog;