import {defineMessages} from "react-intl";

const messages = defineMessages({
  nextPresentation: {
    id: 'home.next-presentation',
    defaultMessage: 'Neste presentasjon',
  },
  news: {
    id: 'home.news',
    defaultMessage: 'Nyheter',
  },
  welcomeToPresentation: {
    id: 'home.welcome-to-presentation',
    defaultMessage: 'Velkommen til bedriftspresentasjon!',
  },
  welcomeToPresentationWith: {
    id: 'home.welcome-to-presentation-with',
    defaultMessage: 'Velkommen til bedriftspresentasjon med {company}!',
  },
  clickForRegistration: {
    id: 'home.click-for-registration',
    defaultMessage: 'Klikk her for å melde deg på',
  },
  clickForDeregistration: {
    id: 'home.click-for-deregistration',
    defaultMessage: 'Klikk her for å melde deg av',
  },
  presentationOpenFor: {
    id: 'home.presentation-open-for',
    defaultMessage: 'Påmeldingen er åpen for {year}. - 5. årsstudenter'
  },
  presentationOpenForAll: {
    id: 'home.presentation-open',
    defaultMessage: 'Påmeldingen er åpen for alle årstrinn',
  },

  confirmDeregistration: {
    id: 'home.confirm-deregistration',
    defaultMessage: 'Bekreft avmelding',
  },
  confirmDeregistrationMessage: {
    id: 'home.confirm-deregistration-message',
    defaultMessage: 'Er du sikker på at du ønsker å melde deg av bedriftspresentasjonen?',
  },
  confirmDeregistrationYes: {
    id: 'home.confirm-deregistration-yes',
    defaultMessage: 'Ja, meld meg av presentasjonen',
  },
  confirmDeregistrationError: {
    id: 'home.confirm-deregistration-error',
    defaultMessage: 'Kunne ikke melde deg av presentasjonen, prøv igjen om litt',
  },
  confirmDeregistrationSuccessful: {
    id: 'home.confirm-deregistration-successful',
    defaultMessage: 'Du er nå avmeldt bedriftspresentasjonen!',
  },
});

export default messages;