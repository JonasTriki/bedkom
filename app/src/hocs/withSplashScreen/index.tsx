import React, {Component, ComponentType} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {version} from '../../../package.json';
import {FooterDetails, LoadingWrapper, Logo} from "./styles";
import {usersGet} from "../../api/endpoints";
import {RootState} from "../../store";
import {userAuthenticated} from "../../api/actions";
import {SessionData} from "../../models/SessionData";

function LoadingMessage() {
  return (
    <LoadingWrapper>
      <Logo/>
      <FormattedMessage
        id='app.title'
        defaultMessage='Bedriftskomitéen v/echo'
      />
      <FooterDetails>
        <FormattedMessage
          id='app.version'
          defaultMessage='Versjon {version}'
          values={{version}}
        />
      </FooterDetails>
    </LoadingWrapper>
  );
}

interface SplashScreenState {
  isAuthenticated: boolean;
  userAuthenticated: (data: SessionData) => any;
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.api.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userAuthenticated: (data: SessionData) => dispatch(userAuthenticated(data)),
});

function withSplashScreen(WrappedComponent: ComponentType<any>) {
  return connect(mapStateToProps, mapDispatchToProps)(
    class extends Component<SplashScreenState> {
      state = {loading: true};

      async componentDidMount() {
        const {userAuthenticated} = this.props;
        const response = await usersGet();
        if (!response || response.status !== 200) {

          // Error occured while fetching user info.
          this.setState({loading: false});
          return;
        }

        // Dispatch the user info
        userAuthenticated(response.data.data);
      }

      render() {
        const {isAuthenticated} = this.props;

        // While checking user session, show "loading" message
        if (this.state.loading && !isAuthenticated) return LoadingMessage();

        // Otherwise, show the desired route
        return <WrappedComponent {...this.props} />;
      }
    }
  );
}

export default withSplashScreen;