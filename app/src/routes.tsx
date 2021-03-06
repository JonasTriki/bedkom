import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import RestrictedRoute, {
  RestrictedRouteProps
} from "./components/RestrictedRoute";

// Pages
import Home from "./pages/Home";
import { Presentations } from "./pages/Presentations";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { NoMatch } from "./pages/NoMatch";
import Admin from "./pages/Admin";

export function routes(isAuthenticated: boolean) {
  const protectedRouteProps: RestrictedRouteProps = {
    isAuthenticated: isAuthenticated,
    authenticationPath: "/login"
  };

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/presentations" component={Presentations} />
      <Route exact path="/company" component={Companies} />
      <Route exact path="/about" component={About} />
      <RestrictedRoute
        {...protectedRouteProps}
        exact
        path="/profile"
        component={Profile}
      />
      <RestrictedRoute
        {...protectedRouteProps}
        path="/admin"
        component={Admin}
      />
      <Route
        path="/login"
        render={(props: RouteComponentProps) => {
          const { from } = props.location.state || { from: { pathname: "/" } };
          return isAuthenticated ? (
            <Redirect to={from} />
          ) : (
            <Login {...props} />
          );
        }}
      />
      <Route component={NoMatch} />
    </Switch>
  );
}

/*

<Route path='/login' render={(props) => (
        isAuthenticated ? (
          <Redirect to='/'/>
        ) : (
          <Login {...props} />
        )
      )}/>

 */
