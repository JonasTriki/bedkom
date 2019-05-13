import {defineMessages} from "react-intl";

export const messages = defineMessages({
  institution: {
    id: 'login.choose.institution',
    defaultMessage: 'Velg institusjon...'
  },
  invalidUsernamePassword: {
    id: 'login.invalid.username.password',
    defaultMessage: 'Feil brukernavn/passord',
  },
  invalidPassword: {
    id: 'login.invalid.password',
    defaultMessage: 'Feil passord',
  },
  studentNotInformatics: {
    id: 'login.student.forbidden',
    defaultMessage: 'Fant ingen tilknytning til Institutt for informatikk. Er du informatikk-student?'
  },
  unexpectedErrorLogin: {
    id: 'login.unexpected.error.login',
    defaultMessage: 'Klarte ikke å logge deg inn, prøv igjen om litt',
  },
  unexpectedError: {
    id: 'login.unexpected.error',
    defaultMessage: 'En uventet feil har oppstått, prøv igjen om litt',
  },
  username: {
    id: 'login.username',
    defaultMessage: 'Brukernavn'
  },
  password: {
    id: 'login.password',
    defaultMessage: 'Passord'
  },
  newPassword: {
    id: 'login.new-password',
    defaultMessage: 'Nytt passord'
  },
  allergies: {
    id: 'login.allergies',
    defaultMessage: 'Allergier (f.eks gluten)',
  },
  feidePassword: {
    id: 'login.feide-password',
    defaultMessage: 'Feide-passord'
  },
  email: {
    id: 'login.email',
    defaultMessage: 'E-postadresse'
  },
  signIn: {
    id: 'login.sign-in',
    defaultMessage: 'Logg inn'
  },
});