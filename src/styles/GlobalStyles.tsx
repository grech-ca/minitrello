import { FC } from 'react';

import { Global, css } from '@emotion/react';

export const GlobalStyles: FC = () => (
  <Global
    styles={css({
      html: {
        fontFamily: 'Roboto',
      },
      '*': {
        boxSizing: 'border-box',
      },
    })}
  />
);
