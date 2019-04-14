import React, {Component} from 'react';
import withSplashScreen from './hocs/withSplashScreen';
import {RootState} from "./store";
import {connect} from "react-redux";

// Routes with all pages
import {routes} from "./routes";
import AppWrapper from "./components/AppWrapper";

// TODO: Map all redux store to props, or only parts of it?
const mapStateToProps = (state: RootState) => state;

class App extends Component<RootState> {

  render() {
    const page = routes(this.props.api.isAuthenticated);
    return (
      <AppWrapper page={page}/>
    )
  }
}

export default withSplashScreen(connect(mapStateToProps)(App));
