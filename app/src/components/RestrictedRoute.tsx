import * as React from "react";
import {Redirect, Route, RouteProps} from "react-router";

export interface RestrictedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export class RestrictedRoute extends Route<RestrictedRouteProps> {
  render() {
    const {isAuthenticated, authenticationPath, location} = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: authenticationPath,
            state: {from: location}
          }}
        />
      );
    } else {
      return <React.Component {...this.props} />;
    }
  }
}

export default RestrictedRoute;