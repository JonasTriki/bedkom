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
  studentNotInformatics: {
    id: 'login.student.forbidden',
    defaultMessage: 'Fant ingen tilknytning til Institutt for informatikk. Er du informatikk-student?'
  },
  unexpectedError: {
    id: 'login.unexpected.error',
    defaultMessage: 'En uventet feil har oppstått, prøv å logge inn om litt',
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
  email: {
    id: 'login.email',
    defaultMessage: 'E-post adresse'
  },
  signIn: {
    id: 'login.sign-in',
    defaultMessage: 'Logg inn'
  },
});