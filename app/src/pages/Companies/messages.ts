import {defineMessages} from "react-intl";

const messages = defineMessages({
  contactForm: {
    id: 'companies.contact-form',
    defaultMessage: 'Kontaktskjema bedrifter',
  },
  name: {
    id: 'companies.contact-form.name',
    defaultMessage: 'Navn',
  },
  company: {
    id: 'companies.contact-form.company',
    defaultMessage: 'Bedrift',
  },
  email: {
    id: 'companies.contact-form.email',
    defaultMessage: 'E-postadresse',
  },
  message: {
    id: 'companies.contact-form.message',
    defaultMessage: 'Melding',
  },
  errorName: {
    id: 'companies.contact-form.error.name',
    defaultMessage: 'Vennligst skriv inn et navn',
  },
  errorCompany: {
    id: 'companies.contact-form.error.company',
    defaultMessage: 'Vennligst skriv inn din bedrift',
  },
  errorEmail: {
    id: 'companies.contact-form.error.mail',
    defaultMessage: 'Vennligst skriv inn en gyldig e-postadresse',
  },
  errorMessage: {
    id: 'companies.contact-form.error.message',
    defaultMessage: 'Vennligst skriv inn en melding',
  },
  errorSendingMessage: {
    id: 'companies.contact-form.error-sending-message',
    defaultMessage: 'Feil ved sending av melding, prøv igjen om litt'
  },
  messageSent: {
    id: 'companies.contact-form.message-sent',
    defaultMessage: 'Vi har mottat din melding og vil komme tilbake til deg snarest!'
  }
});

export default messages;