import React, {useEffect, useState} from 'react';
import {ValueType} from "react-select/lib/types";
import {connect} from "react-redux";
import {FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps} from 'react-intl';
import {Input, Wrapper, Container, Title, Form, Link, Instructions, ErrorMessage, Info} from "./styles";
import {Button} from '../../styles/Button';
import {StyledSelect} from '../../components/StyledSelect';
import * as api from "../../api/endpoints";
import {ApiResponse} from "../../models/ApiResponse";
import {messages} from './messages';
import {RootState} from "../../store";
import {Dispatch} from "redux";
import {userAuthenticated} from "../../api/actions";
import {SessionData} from "../../models/SessionData";

interface LoginProps extends InjectedIntlProps {
  isAuthenticated: boolean;
  userAuthenticated: (data: SessionData) => any;
}

type OrgType = { label: string; value: string };

const orgValues = [
  {value: 'uib', label: 'UiB'},
  {value: 'hvl', label: 'HVL'},
];

type LoginStage = 'login' | 'first-time-setup' | 'user-verification';

interface FirstLogin {
  token: string;
  email: string;
}

const Login = injectIntl<LoginProps>(({intl, userAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState(orgValues[0]);

  const [stage, setStage] = useState<LoginStage>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // First-time setup
  const [verToken, setVerToken] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // User verification password
  const [feidePassword, setFeidePassword] = useState('');

  // Reset error when user changes input
  useEffect(() => setError(''), [
    username, password, org, stage, verToken, email, newPassword, feidePassword
  ]);

  const actionRequired = (response: ApiResponse) => {
    switch (response.message) {
      case 'user-verification':

        // User has to re-verify for the semester.
        setStage('user-verification');
        break;
      case 'first-time-setup':

        // First time login for a user; first-login setup is required.
        const firstLogin: FirstLogin = response.data;
        setVerToken(firstLogin.token);
        setEmail(firstLogin.email);
        setStage('first-time-setup');
        break;
      default:
        break;
    }
  };

  const loginClicked = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    let response = await api.usersLogin(username, password, org.value);
    if (!response) {
      setError(intl.formatMessage(messages.unexpectedErrorLogin));
      setLoading(false);
      return;
    }
    const respData = response.data;

    // Check our API result's status codes
    switch (response.status) {
      case 200:

        // Signed in ok! Data contains user info.
        return userAuthenticated(respData.data);
      case 202:

        // Action required qqby the user
        actionRequired(respData);
        break;
      case 400:
      case 401:

        // Invalid username/password combination
        setError(intl.formatMessage(messages.invalidUsernamePassword));
        break;
      case 403:

        // Student is not an informatics student
        setError(intl.formatMessage(messages.studentNotInformatics));
        break;
      default:

        // Unexpected error occured
        setError(intl.formatMessage(messages.unexpectedErrorLogin));
        break;
    }
    setLoading(false);
  };

  const setupLoginClicked = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const response = await api.usersSetup(username, newPassword, verToken, email);
    if (!response || response.status !== 200) {
      setError(intl.formatMessage(messages.unexpectedError));
      setLoading(false);
      return;
    }

    // User set up correctly. Data contains user info.
    userAuthenticated(response.data.data);
  };

  const verifyUserLoginClicked = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const response = await api.usersVerify(username, feidePassword);
    if (!response) {
      setError(intl.formatMessage(messages.unexpectedError));
      setLoading(false);
      return;
    }

    // Check our API result's status codes
    switch (response.status) {
      case 200:

        // User verification ok! Data contains user info.
        return userAuthenticated(response.data.data);
      case 401:

        // Invalid Feide-password combination
        setError(intl.formatMessage(messages.invalidPassword));
        break;
      case 403:

        // Student is not an informatics student
        setError(intl.formatMessage(messages.studentNotInformatics));
        break;
      default:

        // Unexpected error occured
        setError(intl.formatMessage(messages.unexpectedError));
        break;
    }
    setLoading(false);
  };

  const loginStage = (
    <Wrapper>
      <Container>
        <Title>
          <FormattedMessage
            id='login.header'
            defaultMessage='Logg inn til Bedkom'
          />
        </Title>
        <Form>
          <Input
            value={username}
            placeholder='Brukernavn'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            password
            value={password}
            placeholder='Passord'
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledSelect
            value={org}
            options={orgValues}
            isSearchable={false}
            placeholder={intl.formatMessage(messages.institution)}
            onChange={(org: ValueType<OrgType>) => setOrg(org as OrgType)}
          />
          <Button
            dark spanned
            onClick={loginClicked}>
            {intl.formatMessage(messages.signIn)}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Link>
          <FormattedMessage
            id='login.forgot-password'
            defaultMessage='Glemt passord?'
          />
        </Link>
      </Container>
      <Instructions>
        <FormattedHTMLMessage
          id='login.instructions'
          defaultMessage='
                <i>Instruksjoner</i><br />
                <span class="emphasis">Student</span>: Dersom du er ny til systemet, logg inn med ditt UiB brukernavn (f.eks: abc123) og passord.<br />
                <span class="emphasis">Bedrift</span>: Vi har sendt deg instruksjoner om hvordan du kan få tilgang til kontoen din.
              '
        />
      </Instructions>
    </Wrapper>
  );

  const passwordSetupStage = (
    <Wrapper>
      <Container>
        <Title>
          <FormattedMessage
            id='login.first-time-setup.header'
            defaultMessage='Velkommen til Bedkom!'
          />
        </Title>
        <Info>
          <FormattedMessage
            id='login.first-time-setup.info'
            defaultMessage='Før vi kan opprette brukeren din, er du nødt til å se over at e-post adressen nedenfor stemmer, samt opprette nytt innloggings-passord.'
          />
        </Info>
        <Form>
          <Input
            email
            value={email}
            placeholder={intl.formatMessage(messages.email)}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            password
            value={newPassword}
            placeholder={intl.formatMessage(messages.newPassword)}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            dark spanned
            onClick={setupLoginClicked}>
            {intl.formatMessage(messages.signIn)}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Container>
    </Wrapper>
  );

  const userVerificationStage = (
    <Wrapper>
      <Container>
        <Title>
          <FormattedMessage
            id='login.user-verification.header'
            defaultMessage='Hallaien!'
          />
        </Title>
        <Info>
          <FormattedMessage
            id='login.user-verification.info'
            defaultMessage='For at vi skal kunne logge deg inn, er vi nødt til å få verifisert at du er tilknyttet Institutt for informatikk. Vennligst skriv inn ditt Feide-passord og logg inn for å verifisere deg.'
          />
        </Info>
        <Form>
          <Input
            password
            value={feidePassword}
            placeholder={intl.formatMessage(messages.feidePassword)}
            onChange={(e) => setFeidePassword(e.target.value)}
          />
          <Button
            dark spanned
            onClick={verifyUserLoginClicked}>
            {intl.formatMessage(messages.signIn)}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Container>
    </Wrapper>
  );

  switch (stage) {
    case "login":
      return loginStage;
    case "first-time-setup":
      return passwordSetupStage;
    case "user-verification":
      return userVerificationStage;
    default:
      return loginStage;
  }
});

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.api.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userAuthenticated: (data: SessionData) => dispatch(userAuthenticated(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);