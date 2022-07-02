import { FC, ReactNode } from 'react';

import { Header } from 'components/layout';

import { LayoutWrapper } from './styles';

export interface LayoutProps {
  children?: null | ReactNode | ReactNode[];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};
