import { FC, Fragment, ReactNode } from 'react';

import { Header } from 'components/layout';

export interface LayoutProps {
  children?: null | ReactNode | ReactNode[];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};
