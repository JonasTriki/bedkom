import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";

interface CompaniesPageProps extends InjectedIntlProps {

}

const CompaniesPage = injectIntl<CompaniesPageProps>(({intl}) => {

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.companies)}</PageTitle>
      <PageContent>
        Bedrifter
      </PageContent>
    </AdminPage>
  )
});

export default CompaniesPage;