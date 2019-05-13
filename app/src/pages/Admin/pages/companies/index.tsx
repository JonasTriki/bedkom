import * as React from "react";
import {AdminPage, PageTitle, PageContent, PageHeader} from "../../styles";
import {injectIntl, InjectedIntlProps, FormattedMessage} from "react-intl";
import adminMessages from "../../messages";
import {RootState} from "../../../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {getCompanies} from "../../../../api/actions";
import {useEffect} from "react";
import {Company} from "../../../../models/Company";
import {Table} from "../../../../styles/Table";
import {messages} from "./messages";
import {Icon} from "@mdi/react";
import {mdiPencil} from "@mdi/js";
import {darkBlue} from "../../../../colors";
import {Button} from "../../../../styles/Button";
import CompanyDialog from "./components/CompanyDialog";
import {useState} from "react";

interface CompaniesPageProps extends InjectedIntlProps {
  getCompanies: () => void;
  companies: Company[] | null;
}

const CompaniesPage = injectIntl<CompaniesPageProps>(({intl, getCompanies, companies}) => {

  // Fetch data upon mounting component
  useEffect(() => {
    getCompanies();
  }, []);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const newCompany = () => {

    // TODO: Open new company dialog.
    setOpen(true);
  };

  const editCompany = (company: Company) => {
    setOpen(true);

    // TODO: Open edit company dialog.
  };

  const table = () => {
    if (!companies) {
      return <div>Laster inn...</div>
    }

    return (
      <Table>
        <colgroup>
          <col/>
          <col style={{width: '25%'}}/>
          <col style={{width: '25%'}}/>
          <col style={{width: '25%'}}/>
          <col style={{width: '25%'}}/>
          <col/>
        </colgroup>
        <thead>
        <tr>
          <th/>
          <th>{intl.formatMessage(messages.name)}</th>
          <th>{intl.formatMessage(messages.description)}</th>
          <th>{intl.formatMessage(messages.website)}</th>
          <th>{intl.formatMessage(messages.contactPersons)}</th>
          <th>{intl.formatMessage(messages.edit)}</th>
        </tr>
        </thead>
        <tbody>
        {companies.map((company, i) => (
          <tr key={i}>
            <td className='company-logo'>
              <img src={company.bannerImgUrl} alt={company.name}/>
            </td>
            <td>{company.name}</td>
            <td>{company.description}</td>
            <td>
              <a href={company.website} target='_blank' rel='noopener noreferrer'>{company.website}</a>
            </td>
            <td>
              {
                company.contactPersons.map((contactPerson, j) => (
                  <div key={j}>{contactPerson.name}</div>
                ))
              }
            </td>
            <td className='icon-button' onClick={() => editCompany(company)}>
              <Icon path={mdiPencil} color={darkBlue} size='1.5rem'/>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
  };

  return (
    <AdminPage>
      <PageHeader>
        <PageTitle>{intl.formatMessage(adminMessages.companies)}</PageTitle>
        <Button onClick={newCompany}>
          <FormattedMessage
            id='companies.new'
            defaultMessage='Ny bedrift'
          />
        </Button>
      </PageHeader>
      <PageContent>
        {table()}
      </PageContent>
      <CompanyDialog
        open={open} setOpen={setOpen}
        editing={editing} setEditing={setEditing}
      />
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