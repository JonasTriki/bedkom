import * as React from "react";
import { AdminPage, PageTitle, PageContent } from "../../styles";
import { injectIntl, InjectedIntlProps } from "react-intl";
import adminMessages from "../../messages";
import { useEffect } from "react";
import { getPresentations } from "../../../../api/actions";
import { RootState } from "../../../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Presentation } from "../../../../models/Presentation";

interface PresentationsPageProps extends InjectedIntlProps {
  getPresentations: () => void;
  presentations: Presentation[] | null;
}

const PresentationsPage = injectIntl<PresentationsPageProps>(
  ({ intl, getPresentations, presentations }) => {
    // Fetch data upon mounting component
    useEffect(() => {
      getPresentations();
    }, []);

    return (
      <AdminPage>
        <PageTitle>{intl.formatMessage(adminMessages.presentations)}</PageTitle>
        <PageContent>
          {!presentations ? (
            <div>Laster inn...</div>
          ) : (
            <ul>
              {presentations.map((presentation, i) => (
                <li key={i}>{presentation.id}</li>
              ))}
            </ul>
          )}
        </PageContent>
      </AdminPage>
    );
  }
);

const mapStateToProps = (state: RootState) => ({
  presentations: state.api.presentations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPresentations: () => dispatch(getPresentations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationsPage);
