import { FC } from 'react';

import { GlobalStyles } from 'styles/GlobalStyles';

import 'normalize.css/normalize.css';
import '@fontsource/roboto';

export const App: FC = () => {
  return (
    <div>
      <GlobalStyles />
      Minitrello
    </div>
  );
};
