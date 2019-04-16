import React, {Component} from 'react';
import withSplashScreen from './hocs/withSplashScreen';
import {RootState} from "./store";
import {connect} from "react-redux";

// Routes with all pages
import {routes} from "./routes";
import AppWrapper from "./components/AppWrapper";

interface AppState {
  isAuthenticated: boolean;
}

class App extends Component<AppState> {

  render() {
    const page = routes(this.props.isAuthenticated);
    return (
      <AppWrapper page={page}/>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.api.isAuthenticated,
});

export default withSplashScreen(connect(mapStateToProps)(App));
