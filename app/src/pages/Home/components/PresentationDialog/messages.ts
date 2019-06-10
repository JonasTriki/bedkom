import { defineMessages } from "react-intl";

const messages = defineMessages({
  title: {
    id: "presentation-dialog.title",
    defaultMessage: "Påmelding til bedriftspresentasjon med {company}"
  },
  register: {
    id: "presentation-dialog.register",
    defaultMessage: "Meld deg på"
  },
  errorRegistering: {
    id: "presentation-dialog.error-registering",
    defaultMessage: "Feil ved påmelding, prøv igjen om litt"
  },
  successfullyRegistered: {
    id: "presentation-dialog.successfully-registered",
    defaultMessage: "Du er nå til bedriftspresentasjon med {company}!"
  }
});

export default messages;
