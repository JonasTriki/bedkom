import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps, defineMessages} from 'react-intl';
import {Input, Wrapper, Container, Title, Form, Link, Instructions} from "./styles";
import {Button} from '../../styles/Button';
import {StyledSelect} from '../../components/StyledSelect';
import * as api from "../../api/endpoints";
import {ValueType} from "react-select/lib/types";
import {ApiResponse} from "../../models/ApiResponse";

interface LoginProps extends RouteComponentProps, InjectedIntlProps {
}

const messages = defineMessages({
  institution: {
    id: 'login.choose.institution',
    defaultMessage: 'Velg institusjon...'
  }
});

type OrgType = { label: string; value: string };

const orgValues = [
  {value: 'uib', label: 'UiB'},
  {value: 'hvl', label: 'HVL'},
];

const Login = injectIntl<LoginProps>(({intl}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState(orgValues[0]);

  const actionRequired = (response: ApiResponse) => {
    switch (response.message) {
      case 'user-verification-required':

        // User has to re-verify for the semester.
        break;
      case 'password-setup':

        // First time login for a user; password setup is required.
        break;
      default:
        break;
    }
  };

  const loginClicked = async (e: React.MouseEvent<HTMLElement>) => {

    // Stop reloading the page
    e.preventDefault();

    try {
      const result = await api.usersLogin(username, password, org.value);
      const response = result.data;
      console.log(response);

      // Check our API result's status codes
      switch (result.status) {
        case 200:

          // Signed in ok!
          console.log(response.data);
          break;
        case 202:

          // Action required by the user
          actionRequired(response);
          break;
        case 400:

          // Invalid username/password combination
          break;
        case 403:

          // Student is not an informatics student
          break;
        default:

          // Unexpected error occured
          break;
      }
    } catch (error) {

    }
  };

  return (
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
            Logg inn
          </Button>
          <Link>
            Glemt passord?
          </Link>
        </Form>
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
});

export default withRouter(Login);