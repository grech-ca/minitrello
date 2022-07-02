import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'components/layout';

import { LayoutWrapper } from './styles';

export const Layout: FC = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
    </LayoutWrapper>
  );
};
