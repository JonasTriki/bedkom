import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import store from "./store";
import {GlobalStyle} from "./styles";

// i18n
import {addLocaleData, IntlProvider} from "react-intl";
import locale_nb from 'react-intl/locale-data/nb';
import locale_en from 'react-intl/locale-data/en';

import messages_nb from "./translations/locales/nb.json";
import messages_en from "./translations/locales/en.json";

// Material UI
import {SnackbarProvider} from "notistack";
import {MuiThemeProvider} from "@material-ui/core";
import theme from "./theme";

interface Messages {
  [key: string]: object;
}

addLocaleData([...locale_nb, ...locale_en]);

const messages: Messages = {
  'nb': messages_nb,
  'en': messages_en
};

let locale = navigator.language.split(/[-_]/)[0];
if (!(locale in messages)) {
  locale = 'en';
}
const message = messages[locale];

// Creates a React app with Redux store, React-navigation and global styled-components styles.
const app = (
  <IntlProvider defaultLocale='nb' locale={locale} messages={message}>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle/>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <App/>
          </SnackbarProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);

render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
