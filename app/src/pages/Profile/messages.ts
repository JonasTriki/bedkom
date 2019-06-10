import { defineMessages } from "react-intl";

const messages = defineMessages({
  spring: {
    id: "profile.semester.spring",
    defaultMessage: "Høst"
  },
  autumn: {
    id: "profile.semester.autumn",
    defaultMessage: "Vår"
  },
  errorFirstName: {
    id: "profile.error.first-name",
    defaultMessage: "Vennligst skriv inn et fornavn"
  },
  errorLastName: {
    id: "profile.error.last-name",
    defaultMessage: "Vennligst skriv inn et etternavn"
  },
  errorEmail: {
    id: "profile.error.email",
    defaultMessage: "Vennligst skriv inn en gyldig e-postadresse"
  },
  saving: {
    id: "profile.saving",
    defaultMessage: "Lagrer..."
  },
  profileChangingError: {
    id: "profile.changing-error",
    defaultMessage: "Klarte ikke å endre din profil, prøv igjen om litt"
  },
  errorCurrentPassword: {
    id: "profile.error.current-password",
    defaultMessage: "Vennligst skriv inn ditt nåværende passord"
  },
  errorNewPassword: {
    id: "profile.error.new-password",
    defaultMessage: "Vennligst skriv inn ditt nye passord"
  },
  currentPassword: {
    id: "profile.current-password",
    defaultMessage: "Nåværende passord"
  },
  newPassword: {
    id: "profile.new-password",
    defaultMessage: "Nytt passord"
  },
  profileLogoutError: {
    id: "profile.logout-error",
    defaultMessage: "Klarte ikke å logge deg ut, prøv igjen om litt"
  },
  changingPasswordError: {
    id: "profile.changing-password-error",
    defaultMessage: "Klarte ikke å endre passord, prøv igjen om litt"
  },
  changingPasswordNoMatch: {
    id: "profile.changing-password-no-match",
    defaultMessage: "Nåværende passord er feil"
  },
  confirmAccountDeletion: {
    id: "profile.confirm-account-deletion",
    defaultMessage: "Bekreft sletting av bruker"
  },
  accountDeletionMessage: {
    id: "profile.account-deletion-message",
    defaultMessage:
      "Ved sletting av bruker mister du tilgang til brukeren din og blir logget ut. Er du sikker på at du ønsker å slette din bruker?"
  },
  accountDeletionYes: {
    id: "profile.account-deletion-yes",
    defaultMessage: "Ja, slett min bruker"
  },
  noAllergies: {
    id: "profile.no-allergies",
    defaultMessage: "Ingen allergier"
  }
});

export default messages;
