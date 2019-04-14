import React, {Component, ComponentClass} from 'react';
import {version} from '../../../package.json';
import {FooterDetails, LoadingWrapper, Logo} from "./styles";
import {FormattedMessage} from 'react-intl';

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

function withSplashScreen(WrappedComponent: ComponentClass<any>) {
  return class extends Component {
    state = {loading: true};

    async componentDidMount() {
      try {

        // TODO: Implement loading of resources.
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {

      // While checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;