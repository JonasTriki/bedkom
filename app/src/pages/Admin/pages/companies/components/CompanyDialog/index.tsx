import * as React from "react";
import FormDialog from "../../../../../../components/FormDialog";
import { injectIntl } from "react-intl";
import { messages } from "./messages";
import { DialogActions } from "../../../../../../styles/DialogActions";
import { DialogContent } from "../../../../../../styles/DialogContent";
import { Input } from "../../../../../../styles/Input";
import { InputWrapper } from "../../../../../../styles/InputWrapper";
import { useState } from "react";
import { ContactPerson } from "../../../../../../models/Company";
import { MultiInput } from "../../../../../../styles/MultiInput";
import StyledDropzone from "../../../../../../components/StyledDropzone";
import { ContactPersonInput, ContactPersons, EmptyCentered } from "./styles";
import { Button } from "../../../../../../styles/Button";
import { ContactPersonItem } from "./components/ContactPersonItem";
import {
  errorSnack,
  infoSnack,
  successSnack
} from "../../../../../../styles/SnackbarProps";
import { useSnackbar } from "notistack";
import { isEmail } from "validator";
import { isPhone } from "../../../../../../utils/validators";
import { companiesCreate } from "../../../../../../api/endpoints";

interface CompanyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}

const CompanyDialog = injectIntl<CompanyDialogProps>(({ intl, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [bannerImg, setBannerImg] = useState<File | null>(null);

  const [cpName, setCpName] = useState("");
  const [cpPosition, setCpPosition] = useState("");
  const [cpEmail, setCpEmail] = useState("");
  const [cpPhone, setCpPhone] = useState("");
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);

  const [loading, setLoading] = useState(false);

  const addContactPerson = () => {
    // Validate input
    if (cpName.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorName), infoSnack);
      return;
    }
    if (cpPosition.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorPosition), infoSnack);
      return;
    }
    if (!isEmail(cpEmail)) {
      enqueueSnackbar(intl.formatMessage(messages.errorEmail), infoSnack);
      return;
    }
    if (!isPhone(cpPhone)) {
      enqueueSnackbar(intl.formatMessage(messages.errorPhone), infoSnack);
      return;
    }

    // Add contactperson
    setContactPersons([
      ...contactPersons,
      {
        name: cpName,
        position: cpPosition,
        email: cpEmail,
        phone: cpPhone
      }
    ]);

    // Clear fields
    setCpName("");
    setCpPosition("");
    setCpEmail("");
    setCpPhone("");
  };

  const onRemoveContactPerson = (index: number) => {
    setContactPersons(contactPersons.filter((_, i) => i !== index));
  };

  const validateInputs = () => {
    if (name.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorName), infoSnack);
      return false;
    }
    if (description.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorDescription), infoSnack);
      return false;
    }
    if (website.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorWebsite), infoSnack);
      return false;
    }
    if (!bannerImg) {
      enqueueSnackbar(intl.formatMessage(messages.errorBanner), infoSnack);
      return false;
    }
    if (contactPersons.length === 0) {
      enqueueSnackbar(
        intl.formatMessage(messages.errorContactPersons),
        infoSnack
      );
      return false;
    }
    return true;
  };

  const addCompany = async () => {
    if (loading || !validateInputs() || !bannerImg) return;
    setLoading(true);

    // Call API to create the company. Also, check for errors.
    const response = await companiesCreate(
      name,
      description,
      website,
      bannerImg,
      contactPersons
    );
    if (!response || response.status !== 200) {
      enqueueSnackbar(
        intl.formatMessage(messages.errorCreatingCompany),
        errorSnack
      );
      setLoading(false);
      return;
    }

    // Company created successfully.
    enqueueSnackbar(
      intl.formatMessage(messages.createdCompany, { company: name }),
      successSnack
    );
    setLoading(false);
    onClose();
  };

  const onClose = () => props.setOpen(false);

  return (
    <FormDialog
      open={props.open}
      onClose={onClose}
      title={
        props.editing
          ? intl.formatMessage(messages.editing, { company: "Test" })
          : intl.formatMessage(messages.create)
      }
    >
      <DialogContent>
        <InputWrapper label={intl.formatMessage(messages.name)}>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </InputWrapper>
        <InputWrapper label={intl.formatMessage(messages.description)}>
          <MultiInput
            value={description}
            minHeight="6rem"
            onChange={e => setDescription(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper label={intl.formatMessage(messages.website)}>
          <Input value={website} onChange={e => setWebsite(e.target.value)} />
        </InputWrapper>
        <InputWrapper label={intl.formatMessage(messages.bannerImg)}>
          <StyledDropzone
            showImage
            accept="image/*"
            placeholder={intl.formatMessage(messages.bannerImgDropzone)}
            onDropAccepted={files => {
              setBannerImg(files[0]);
            }}
          />
        </InputWrapper>
        <InputWrapper label={intl.formatMessage(messages.contactPersons)}>
          <ContactPersons>
            {contactPersons.length > 0 ? (
              contactPersons.map((cp, i) => (
                <ContactPersonItem
                  key={i}
                  index={i}
                  contactPerson={cp}
                  onRemove={onRemoveContactPerson}
                />
              ))
            ) : (
              <EmptyCentered>
                {intl.formatMessage(messages.contactPersonsEmpty)}
              </EmptyCentered>
            )}
          </ContactPersons>
          <ContactPersonInput>
            <Input
              value={cpName}
              onChange={e => setCpName(e.target.value)}
              placeholder={intl.formatMessage(messages.name)}
            />
            <Input
              value={cpPosition}
              onChange={e => setCpPosition(e.target.value)}
              placeholder={intl.formatMessage(messages.position)}
            />
            <Input
              value={cpEmail}
              onChange={e => setCpEmail(e.target.value)}
              placeholder={intl.formatMessage(messages.email)}
            />
            <Input
              value={cpPhone}
              onChange={e => setCpPhone(e.target.value)}
              placeholder={intl.formatMessage(messages.phone)}
            />
            <Button className="add-btn" onClick={addContactPerson}>
              {intl.formatMessage(messages.add)}
            </Button>
          </ContactPersonInput>
        </InputWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} theme="white">
          {intl.formatMessage(messages.cancel)}
        </Button>
        <Button onClick={addCompany} theme="white">
          {loading
            ? intl.formatMessage(messages.loading)
            : intl.formatMessage(messages.addCompany)}
        </Button>
      </DialogActions>
    </FormDialog>
  );
});

export default CompanyDialog;
