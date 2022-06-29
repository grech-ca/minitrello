import { FC, Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'components/layout';

export const Layout: FC = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};
