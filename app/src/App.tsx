import * as React from "react";
import withSplashScreen from "./hocs/withSplashScreen";
import { RootState } from "./store";
import { connect } from "react-redux";

// Routes with all pages
import { routes } from "./routes";
import AppWrapper from "./components/AppWrapper";

interface AppState {
  isAuthenticated: boolean;
}

const App: React.FC<AppState> = ({ isAuthenticated }) => {
  const page = routes(isAuthenticated);
  return <AppWrapper page={page} />;
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.api.isAuthenticated
});

export default withSplashScreen(connect(mapStateToProps)(App));
