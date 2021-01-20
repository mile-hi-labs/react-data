import React from 'react';

// Routes
import IndexRoute from 'routes/index';
import BookIndexRoute from 'routes/books/index';
import BookDetailRoute from 'routes/books/detail';
import BookEditRoute from 'routes/books/edit';

const Routes = [
  {
    path: '/',
    exact: true,
    component: IndexRoute,
  },
  {
    path: '/books',
    exact: true,
    component: BookIndexRoute,
  },
  {
    path: '/books/:bookId',
    exact: true,
    component: BookDetailRoute,
  },
  {
    path: '/books/:bookId/edit',
    exact: true,
    component: BookEditRoute,
  },
];

export default Routes;
