import { FC, Fragment } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { store, persistor } from 'store';

import { GlobalStyles, theme } from 'styles';

import { Router } from 'Router';

import 'normalize.css/normalize.css';
import '@fontsource/roboto';
import 'global.css';

export const App: FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Minitrello</title>
      </Helmet>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};
