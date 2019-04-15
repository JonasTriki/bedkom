import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps, defineMessages} from 'react-intl';
import {Input, Wrapper, Container, Title, Form, Link, Instructions, ErrorMessage, Info} from "./styles";
import {Button} from '../../styles/Button';
import {StyledSelect} from '../../components/StyledSelect';
import * as api from "../../api/endpoints";
import {ValueType} from "react-select/lib/types";
import {ApiResponse} from "../../models/ApiResponse";
import {messages} from './messages';

interface LoginProps extends RouteComponentProps, InjectedIntlProps {
}

type OrgType = { label: string; value: string };

const orgValues = [
  {value: 'uib', label: 'UiB'},
  {value: 'hvl', label: 'HVL'},
];

type LoginStage = 'login' | 'first-login-setup' | 'user-verification';

interface FirstLogin {
  token: string;
  firstName: string;
  email: string;
}

const Login = injectIntl<LoginProps>(({intl}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState(orgValues[0]);

  const [stage, setStage] = useState<LoginStage>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // First-time setup
  const [verToken, setVerToken] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Reset error when user changes input
  useEffect(() => setError(''), [username, password, org]);

  const actionRequired = (response: ApiResponse) => {
    switch (response.message) {
      case 'user-verification':

        // User has to re-verify for the semester.
        setStage('user-verification');
        break;
      case 'first-login-setup':

        // First time login for a user; first-login setup is required.
        const firstLogin: FirstLogin = response.data;
        setVerToken(firstLogin.token);
        setFirstName(firstLogin.firstName);
        setEmail(firstLogin.email);
        setStage('first-login-setup');
        break;
      default:
        break;
    }
  };

  const loginClicked = async (e: React.MouseEvent<HTMLElement>) => {
    if (loading) return;
    setLoading(true);

    // Stop reloading the page
    e.preventDefault();

    let response;
    switch (stage) {
      case 'login':

        // TODO: Input validation
        response = await api.usersLogin(username, password, org.value);
        break;
      case 'first-login-setup':

        // TODO: Input validation
        response = await api.usersPasswordSetup(username, newPassword, org.value, verToken, email);
        break;
      case 'user-verification':

        break;
    }
    if (!response) {
      setError(intl.formatMessage(messages.unexpectedError));
      setLoading(false);
      return;
    }

    // Check our API result's status codes
    switch (response.status) {
      case 200:

        // Signed in ok!
        console.log(response.data);
        break;
      case 202:

        // Action required by the user
        actionRequired(response.data);
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
            id='login.first-login-setup.header'
            defaultMessage='Heisann {name}!'
            values={{name: firstName}}
          />
        </Title>
        <Info>
          <FormattedMessage
            id='login.first-login-setup.info'
            defaultMessage='For vi kan opprette brukeren din, er du nødt til å se over at e-post adressen nedenfor stemmer, samt opprette nytt innloggings-passord.'
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
            onClick={loginClicked}>
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
    case "first-login-setup":
      return passwordSetupStage;
    case "user-verification":
      return loginStage;
    default:
      return loginStage;
  }
});

export default withRouter(Login);