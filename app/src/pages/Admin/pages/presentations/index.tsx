import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";

interface PresentationsPageProps extends InjectedIntlProps {

}

const PresentationsPage = injectIntl<PresentationsPageProps>(({intl}) => {

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.presentations)}</PageTitle>
      <PageContent>
        Presentasjoner
      </PageContent>
    </AdminPage>
  )
});

export default PresentationsPage;