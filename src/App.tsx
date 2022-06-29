import { FC, Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { GlobalStyles, theme } from 'styles';

import { Router } from 'Router';

import 'normalize.css/normalize.css';
import '@fontsource/roboto';

export const App: FC = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </Fragment>
  );
};
