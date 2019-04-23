import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";

interface MenusPageProps extends InjectedIntlProps {

}

const MenusPage = injectIntl<MenusPageProps>(({intl}) => {

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.menus)}</PageTitle>
      <PageContent>
        Menyer
      </PageContent>
    </AdminPage>
  )
});

export default MenusPage;