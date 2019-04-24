import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";
import {useEffect} from "react";
import {getUsers} from "../../../../api/actions";
import {RootState} from "../../../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {User} from "../../../../models/User";

interface UsersPageProps extends InjectedIntlProps {
  getUsers: () => void;
  users: User[] | null;
}

const UsersPage = injectIntl<UsersPageProps>(({intl, getUsers, users}) => {

  // Fetch data upon mounting component
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.users)}</PageTitle>
      <PageContent>
        {!users ? (
          <div>Laster inn...</div>
        ) : (
          <ul>
            {
              users.map((user, i) => <li key={i}>{user.firstName + ' ' + user.lastName}</li>)
            }
          </ul>
        )}
      </PageContent>
    </AdminPage>
  )
});

const mapStateToProps = (state: RootState) => ({
  users: state.api.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);