import { FC } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Layout } from 'components/layout';
import { Board, CardModal } from 'components/board';

export const Router: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/*" element={<Board />} />
        </Route>
      </Routes>
      <Routes location={location} key={`${location.pathname}_modal`}>
        <Route path="/c/:cardId" element={<CardModal />} />
        <Route path="/c/:cardId/:cardTitle" element={<CardModal />} />
      </Routes>
    </AnimatePresence>
  );
};
