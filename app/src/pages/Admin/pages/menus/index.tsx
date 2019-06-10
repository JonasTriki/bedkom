import * as React from "react";
import { AdminPage, PageTitle, PageContent } from "../../styles";
import { injectIntl, InjectedIntlProps } from "react-intl";
import adminMessages from "../../messages";
import { useEffect } from "react";
import { getMenus } from "../../../../api/actions";
import { RootState } from "../../../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Menu } from "../../../../models/Menu";

interface MenusPageProps extends InjectedIntlProps {
  getMenus: () => void;
  menus: Menu[] | null;
}

const MenusPage = injectIntl<MenusPageProps>(({ intl, getMenus, menus }) => {
  // Fetch data upon mounting component
  useEffect(() => {
    getMenus();
  }, []);

  return (
    <AdminPage>
      <PageTitle>{intl.formatMessage(adminMessages.menus)}</PageTitle>
      <PageContent>
        {!menus ? (
          <div>Laster inn...</div>
        ) : (
          <ul>
            {menus.map((menu, i) => (
              <li key={i}>{menu.name}</li>
            ))}
          </ul>
        )}
      </PageContent>
    </AdminPage>
  );
});

const mapStateToProps = (state: RootState) => ({
  menus: state.api.menus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMenus: () => dispatch(getMenus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenusPage);
