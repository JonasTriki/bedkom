import React, { Component, ComponentType } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { version } from "../../../package.json";
import { FooterDetails, LoadingWrapper, Logo } from "./styles";
import { sessionsGet } from "../../api/endpoints";
import { RootState } from "../../store";
import { getPublicData, gotSession } from "../../api/actions";
import { SessionData } from "../../models/SessionData";

function LoadingMessage() {
  return (
    <LoadingWrapper>
      <Logo />
      <FormattedMessage
        id="app.title"
        defaultMessage="Bedriftskomitéen v/echo"
      />
      <FooterDetails>
        <FormattedMessage
          id="app.version"
          defaultMessage="Versjon {version}"
          values={{ version }}
        />
      </FooterDetails>
    </LoadingWrapper>
  );
}

interface SplashScreenState {
  isAuthenticated: boolean;
  getPublicData: () => void;
  gotSession: (data: SessionData) => void;
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.api.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPublicData: () => dispatch(getPublicData()),
  gotSession: (data: SessionData) => dispatch(gotSession(data))
});

function withSplashScreen(WrappedComponent: ComponentType<any>) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class extends Component<SplashScreenState> {
      state = { loading: true };

      async componentDidMount() {
        const { gotSession, getPublicData } = this.props;
        const response = await sessionsGet();
        if (!response || response.status !== 200) {
          // Error occured while fetching session info.
          this.setState({ loading: false });
          return;
        }

        // Also, dispatch an action to fetch all public data.
        getPublicData();

        // Dispatch the session info
        gotSession(response.data.data);
        this.setState({ loading: false });
      }

      render() {
        const { isAuthenticated } = this.props;

        // While checking user session, show "loading" message
        if (this.state.loading && !isAuthenticated) return LoadingMessage();

        // Otherwise, show the desired route
        return <WrappedComponent {...this.props} />;
      }
    }
  );
}

export default withSplashScreen;
