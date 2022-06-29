import { FC } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BoardsPage, BoardPage } from 'pages';

import { Layout } from 'components/layout';

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<BoardsPage />} />
          <Route path="/b/:boardId/:boardName" element={<BoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
