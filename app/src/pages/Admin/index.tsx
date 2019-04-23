import * as React from 'react';
import {connect} from "react-redux";
import {injectIntl, InjectedIntlProps} from 'react-intl';
import {Redirect, RouteComponentProps, Switch, withRouter} from "react-router";
import messages from "./messages";
import {NoMatch} from '../NoMatch';
import {
  AdminPage,
  AdminPageList,
  AdminWrapper,
  AdminPageItemProps,
  AdminPageItem,
  PageListSeparator
} from "./styles";
import {RootState} from "../../store";
import {ApiState} from "../../api/types";
import RestrictedRoute, {RestrictedRouteProps} from "../../components/RestrictedRoute";
import pageComponents from './pages';

interface AdminProps extends InjectedIntlProps, RouteComponentProps {
  api: ApiState;
}

const Admin: React.FC<AdminProps> = ({intl, history, api}) => {
  const protectedRouteProps: RestrictedRouteProps = {
    isAuthenticated: api.isAuthenticated,
    authenticationPath: '/login',
  };

  const adminPath = '/admin';
  const appendPathPrefix = (page: AdminPageItemProps) => ({...page, path: adminPath + page.path});

  const pages: AdminPageItemProps[] = [
    {
      text: intl.formatMessage(messages.presentations),
      path: '/presentations',
      component: pageComponents.presentations,
    },
    {
      text: intl.formatMessage(messages.companies),
      path: '/companies',
      component: pageComponents.companies,
    },
    {
      text: intl.formatMessage(messages.menus),
      path: '/menus',
      component: pageComponents.menus,
    },
    {
      text: intl.formatMessage(messages.users),
      path: '/users',
      component: pageComponents.users,
    },
  ].map(appendPathPrefix);
  const curPath = history.location.pathname;

  // TODO: /admin/presentationsaaa works; it should not work. Figure out a better way to solve this
  const curPage = pages.find((page) => curPath.startsWith(page.path));
  if (curPage) {
    curPage.checked = true;
  } else if (curPath !== '/admin') {

    // Page not found, redirect to 404
    return <NoMatch/>;
  }
  const btnClick = (path: string) => history.push(path);

  return (
    <AdminWrapper>
      <AdminPageList>
        {
          pages.map((page, i) => (
            <AdminPageItem key={i} {...page} onClick={() => btnClick(page.path)}>
              {page.text}
            </AdminPageItem>
          ))
        }
      </AdminPageList>
      <Switch>
        {
          pages.map((page, i) => (
            <RestrictedRoute
              key={i}
              {...protectedRouteProps}
              path={page.path}
              component={page.component}
            />
          ))
        }
        <Redirect to={pages[0].path}/>
      </Switch>
    </AdminWrapper>
  )
};

const mapStateToProps = (state: RootState) => ({
  api: state.api
});

export default connect(mapStateToProps)(injectIntl(withRouter(Admin)));