import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import logo from "../../images/logo.svg";
import {
  Button,
  Buttons,
  Content,
  Divider,
  FloatRight,
  Footer,
  Logo,
  Menu,
  ProfileButton,
  Wrapper
} from "./styles";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { StyledSelect, TransparentStyle } from "../StyledSelect";
import { messages } from "./messages";
import { ApiState } from "../../api/types";
import { RootState } from "../../store";
import Icon from "@mdi/react";
import { mdiAccountCircle } from "@mdi/js";
import { isPermitted } from "../../utils/UserRoles";
import { ValueType } from "react-select/lib/types";
import { Dispatch } from "redux";
import { SupportedLocales } from "../../index";
import { setLanguage } from "../../translations/actions";

interface AppWrapperProps extends InjectedIntlProps, RouteComponentProps {
  page: JSX.Element;
  api: ApiState;
  setLanguage: (lang: SupportedLocales) => void;
}

interface Page {
  text: string;
  path: string;
  checked?: boolean;
  minRole?: string;
}

type LangType = { label: string; value: string };

const AppWrapper: React.FC<AppWrapperProps> = ({
  intl,
  history,
  page,
  api,
  setLanguage
}) => {
  const isAuthenticated = api.isAuthenticated;

  // Small filter to check if the user has access to the page
  const hasPageAccess = (page: Page) => {
    if (!page.minRole) return true;
    return isAuthenticated && isPermitted(api.user, page.minRole);
  };

  const languageOpts = [
    { value: "nb", label: intl.formatMessage(messages.norwegian) },
    { value: "en", label: intl.formatMessage(messages.english) }
  ];

  const homePage: Page = {
    text: intl.formatMessage(messages.home),
    path: "/"
  };

  const signInPage: Page = {
    text: intl.formatMessage(messages.signIn),
    path: "/login"
  };

  const profilePath = "/profile";

  const pages: Page[] = [
    {
      text: intl.formatMessage(messages.presentations),
      path: "/presentations"
    },
    {
      text: intl.formatMessage(messages.company),
      path: "/company"
    },
    {
      text: intl.formatMessage(messages.about),
      path: "/about"
    },
    {
      text: intl.formatMessage(messages.admin),
      path: "/admin",
      minRole: "bedkom"
    }
  ];
  let allPages = [homePage, ...pages].filter(hasPageAccess);

  let curPage: Page | undefined;
  const curPath = history.location.pathname;
  if (curPath === homePage.path) {
    curPage = homePage;
  } else if (curPath.startsWith(signInPage.path)) {
    curPage = signInPage;
  } else {
    curPage = pages.find(page => curPath.startsWith(page.path));
  }
  if (curPage) {
    curPage.checked = true;
  }

  const btnClick = (path: string) => history.push(path);

  const changeLanguage = (langOpt: ValueType<LangType>) => {
    if (!langOpt) return;
    const lang = (langOpt as LangType).value;
    setLanguage(lang as SupportedLocales);
  };

  return (
    <Wrapper>
      <Menu>
        <Logo src={logo} />
        <Buttons>
          {allPages.map((page, i) => (
            <Button
              key={i}
              active={page.checked}
              onClick={() => btnClick(page.path)}
            >
              {page.text}
            </Button>
          ))}
        </Buttons>
        <FloatRight>
          <StyledSelect
            isSearchable={false}
            value={languageOpts.find(opt => opt.value === intl.locale)}
            options={languageOpts}
            styles={TransparentStyle("8rem")}
            onChange={changeLanguage}
          />
          <Divider />
          {api.isAuthenticated ? (
            <ProfileButton
              active={curPath.startsWith(profilePath)}
              onClick={() => btnClick(profilePath)}
            >
              <Icon
                className="thumb"
                path={mdiAccountCircle}
                color="white"
                size="2rem"
              />
              {api.user.firstName}
            </ProfileButton>
          ) : (
            <Button
              active={signInPage.checked}
              onClick={() => btnClick(signInPage.path)}
            >
              {signInPage.text}
            </Button>
          )}
        </FloatRight>
      </Menu>
      <Content>{page}</Content>
      <Footer>
        <FormattedMessage
          id="footer.text"
          defaultMessage="Bedriftskomitéen ved {echo}Designet og utviklet med ❤️av {author}"
          values={{
            echo: (
              <>
                <a
                  className="yellow sneaky"
                  href="https://echo.uib.no"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  echo – Fagutvalget for informatikk, UiB
                </a>
                <br />
              </>
            ),
            author: (
              <a
                className="yellow sneaky"
                href="https://triki.no/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jonas Triki
              </a>
            )
          }}
        />
      </Footer>
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  api: state.api
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLanguage: (lang: SupportedLocales) => dispatch(setLanguage(lang))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(AppWrapper)));
