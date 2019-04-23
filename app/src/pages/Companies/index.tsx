import React, {useState} from 'react';
import {injectIntl, FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import {Title, TopInfo, Wrapper, FormWrapper, CenteredTitle, MultiInput} from './styles';
import {Form} from "../../styles/Form";
import {Input} from "../../styles/Input";
import {Button} from "../../styles/Button";
import {errorSnack, infoSnack, successSnack} from "../../styles/SnackbarProps";
import isEmail from "validator/lib/isEmail";
import {useSnackbar} from "notistack";
import messages from "./messages";
import * as api from "../../api/endpoints";

interface CompaniesProps {

}

const Companies = injectIntl<CompaniesProps>(({intl}) => {
  const {enqueueSnackbar} = useSnackbar();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendingForm, setSendingForm] = useState(false);
  const resetState = () => {

    // TODO: Kind of lame to be doing this all manually, right?
    setName('');
    setCompany('');
    setEmail('');
    setMessage('');
    setSendingForm(false);
  };

  const validateContactFormInput = () => {
    if (name.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorName), infoSnack);
      return false;
    }
    if (company.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorCompany), infoSnack);
      return false;
    }
    if (!isEmail(email)) {
      enqueueSnackbar(intl.formatMessage(messages.errorEmail), infoSnack);
      return false;
    }
    if (message.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorMessage), infoSnack);
      return false;
    }
    return true;
  };

  const sendContactForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (sendingForm || !validateContactFormInput()) return;
    setSendingForm(true);

    let response = await api.companiesContact(name, company, email, message);
    if (!response || response.status !== 200) {
      enqueueSnackbar(intl.formatMessage(messages.errorSendingMessage), errorSnack);
    } else {
      enqueueSnackbar(intl.formatMessage(messages.messageSent), successSnack);
    }
    resetState();
  };

  const formSection = (
    <FormWrapper>
      <CenteredTitle>
        {intl.formatMessage(messages.contactForm)}
      </CenteredTitle>
      <Form fixedWidth='25rem'>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={intl.formatMessage(messages.name)}
        />
        <Input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={intl.formatMessage(messages.company)}
        />
        <Input
          email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={intl.formatMessage(messages.email)}
        />
        <MultiInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={intl.formatMessage(messages.message)}
        />
        <Button onClick={sendContactForm}>
          <FormattedMessage
            id='about.companies-form-send'
            defaultMessage='Send inn'
          />
        </Button>
      </Form>
    </FormWrapper>
  );

  return (
    <Wrapper>
      <TopInfo>
        <Title>
          <FormattedMessage
            id='companies.info-title'
            defaultMessage='Om bedriftspresentasjoner'
          />
        </Title>
        <FormattedHTMLMessage
          id='companies.info-text'
          defaultMessage='
            <p>Ved å holde bedriftspresentasjon får dere som bedrift en fantastisk mulighet til å knytte kontakt med et bredt utvalg av instituttets mer enn 300 studenter, fordelt på alle årstrinn. En slik relasjonsbygging gjør også at studentene får et personlig bilde av hvordan arbeidsmiljøet er i bedriften. En bedriftspresentasjon består ofte av en presentasjon der dere som bedrift kan fortelle om hva dere driver med, og hvorfor studentene skal komme til nettopp dere. Bedriften tar med studentene ut på et spisested (eventuelt mat i lokalene) der dere får bli personlig kjent med studentene.</p>

            <p>Vi hjelper til med det praktiske rundt forberedelsene og setter av dagen slik at det ikke arrangeres andre arrangement samtidig. Vi tror det er bra for bedriften dersom studentene får komme til bedriftens lokaler, men vi tilbyr også lokaler på Høyteknologisenteret for selve presentasjonen. Bedriftskomitéen planlegger bedriftspresentasjonene et halvår i forveien, så husk å være tidlig ute med å booke.</p>

            <p>Ta gjerne kontakt dersom dere ønsker å holde bedriftspresentasjon, ønsker informasjon om pris, eller har øvrige spørsmål.</p>
          '
        />
      </TopInfo>
      {formSection}
    </Wrapper>
  )
});

export default Companies;