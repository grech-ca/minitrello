import { FC, Fragment } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';

import { Board } from 'components/board';
import { Layout } from 'components/layout';

import { store, persistor } from 'store';

import { GlobalStyles, theme } from 'styles';

import 'normalize.css/normalize.css';
import '@fontsource/roboto';

export const App: FC = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Board />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};
