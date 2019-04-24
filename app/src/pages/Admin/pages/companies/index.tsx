import * as React from "react";
import {AdminPage, PageTitle, PageContent} from "../../styles";
import {injectIntl, InjectedIntlProps} from "react-intl";
import adminMessages from "../../messages";
import {RootState} from "../../../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {getCompanies} from "../../../../api/actions";
import {useEffect} from "react";
import {Company} from "../../../../models/Company";

interface CompaniesPageProps extends InjectedIntlProps {
  getCompanies: () => void;
  companies: Company[] | null;
}

const CompaniesPage = injectIntl<CompaniesPageProps>(({intl, getCompanies, companies}) => {

  // Fetch data upon mounting component
  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.companies)}</PageTitle>
      <PageContent>
        {!companies ? (
          <div>Laster inn...</div>
        ) : (
          <ul>
            {
              companies.map((company, i) => <li key={i}>{company.name}</li>)
            }
          </ul>
        )}
      </PageContent>
    </AdminPage>
  )
});

const mapStateToProps = (state: RootState) => ({
  companies: state.api.companies,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCompanies: () => dispatch(getCompanies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesPage);