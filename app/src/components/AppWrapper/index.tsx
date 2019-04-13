import * as React from 'react';
import logo from '../../images/logo.svg';
import {Button, Buttons, Content, Footer, Logo, Menu, Wrapper} from "./styles";
import {RouteComponentProps, withRouter} from "react-router";
import {InjectedIntlProps, injectIntl, defineMessages} from 'react-intl';

interface AppWrapperProps extends InjectedIntlProps, RouteComponentProps {
  page: JSX.Element,
}

interface Page {
  text: string;
  path: string;
  checked?: boolean;
}

const messages = defineMessages({
  home: {
    id: 'menu.home',
    defaultMessage: 'Hjem',
  },
  presentations: {
    id: 'menu.presentations',
    defaultMessage: 'Presentasjoner',
  },
  company: {
    id: 'menu.company',
    defaultMessage: 'For bedrifter',
  },
  about: {
    id: 'menu.about',
    defaultMessage: 'Om Bedkom',
  },
});

const AppWrapper: React.FC<AppWrapperProps> = ({intl, history, page}) => {

  const homePage: Page = {
    text: intl.formatMessage(messages.home),
    path: '/',
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
    },
  ];
  const allPages = [homePage, ...pages];

  let curPage;
  const curPath = history.location.pathname;
  if (curPath === homePage.path) {
    curPage = homePage;
  } else {
    curPage = pages.find((page) => curPath.startsWith(page.path));
  }
  if (curPage) {
    curPage.checked = true;
  }

  const btnClick = (i: number) => {
    const destPath = allPages[i].path;
    history.push(destPath);
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
                onClick={() => btnClick(i)}>{page.text}
              </Button>
            ))
          }
        </Buttons>
      </Menu>
      <Content>{page}</Content>
      <Footer>
        Bedriftskomitéen ved echo – Fagutvalget for informatikk, UiB<br />
        Designet og utviklet av <span><a href='https://triki.no/'>Jonas Triki</a></span>
      </Footer>
    </Wrapper>
  )
};

export default injectIntl(withRouter(AppWrapper));