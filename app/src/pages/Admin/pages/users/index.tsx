import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";

interface UsersPageProps extends InjectedIntlProps {

}

const UsersPage = injectIntl<UsersPageProps>(({intl}) => {

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.users)}</PageTitle>
      <PageContent>
        Brukere
      </PageContent>
    </AdminPage>
  )
});

export default UsersPage;