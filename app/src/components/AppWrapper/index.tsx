import * as React from 'react';
import logo from '../../images/logo.svg';
import {Button, Buttons, Content, Divider, FloatRight, Footer, Logo, Menu, Wrapper} from "./styles";
import {RouteComponentProps, withRouter} from "react-router";
import {InjectedIntlProps, injectIntl, FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import {StyledSelect, TransparentStyle} from "../StyledSelect";
import {messages} from "./messages";

interface AppWrapperProps extends InjectedIntlProps, RouteComponentProps {
  page: JSX.Element,
}

interface Page {
  text: string;
  path: string;
  checked?: boolean;
}

const AppWrapper: React.FC<AppWrapperProps> = ({intl, history, page}) => {

  const languageOpts = [
    {value: 'nb', label: intl.formatMessage(messages.norwegian)},
    {value: 'en', label: intl.formatMessage(messages.english)},
  ];

  const homePage: Page = {
    text: intl.formatMessage(messages.home),
    path: '/',
  };

  const signInPage: Page = {
    text: intl.formatMessage(messages.signIn),
    path: '/login'
  };

  const pages: Page[] = [
    {
      text: intl.formatMessage(messages.presentations),
      path: '/presentations',
    },
    {
      text: intl.formatMessage(messages.company),
      path: '/company',
    },
    {
      text: intl.formatMessage(messages.about),
      path: '/about',
    }
  ];
  const allPages = [homePage, ...pages];

  let curPage: Page | undefined;
  const curPath = history.location.pathname;
  if (curPath === homePage.path) {
    curPage = homePage;
  } else if (curPath.startsWith(signInPage.path)) {
    curPage = signInPage;
  } else {
    curPage = pages.find((page) => curPath.startsWith(page.path));
  }
  if (curPage) {
    curPage.checked = true;
  }

  const btnClick = (path: string) => {
    history.push(path);
  };

  return (
    <Wrapper>
      <Menu>
        <Logo src={logo}/>
        <Buttons>
          {
            allPages.map((page, i) => (
              <Button
                key={i}
                active={page.checked}
                onClick={() => btnClick(page.path)}>{page.text}
              </Button>
            ))
          }
        </Buttons>
        <FloatRight>
          <StyledSelect
            isSearchable={false}
            options={languageOpts}
            defaultValue={languageOpts[0]}
            styles={TransparentStyle("8rem")}
          />
          <Divider/>
          <Button
            active={signInPage.checked}
            onClick={() => btnClick(signInPage.path)}>{signInPage.text}
          </Button>
        </FloatRight>
      </Menu>
      <Content>{page}</Content>
      <Footer>
        <FormattedMessage
          id='footer.text'
          defaultMessage='Bedriftskomitéen ved {echo}Designet og utviklet av {author}'
          values={{
            echo: (
              <>
                <a className='sneaky' href='https://echo.uib.no'>echo – Fagutvalget for informatikk, UiB</a>
                <br/>
              </>
            ),
            author: <a className='sneaky' href='https://triki.no/'>Jonas Triki</a>,
          }}
        />
      </Footer>
    </Wrapper>
  )
};

export default injectIntl(withRouter(AppWrapper));