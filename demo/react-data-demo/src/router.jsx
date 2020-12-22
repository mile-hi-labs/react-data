import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useParams, useRouteMatch } from 'react-router-dom';

// Contexts
import { withStore } from '@mile-hi-labs/react-data';

// Routes
import IndexRoute from './routes/index';

import BooksRoute from './routes/books/index';
import BooksNewRoute from './routes/books/new';
import BooksDetailRoute from './routes/books/detail';
import BooksEditRoute from './routes/books/edit';

// Utils
import ErrorBoundary from './utils/error-boundary';


const Router = (props) => {
  const { store } = props;

  // Hooks
  useEffect(() => {
    console.log('Store: ', store);
  }, [])


  // Render
  return (
  	<ErrorBoundary>
	    <Switch>
	      <Route exact path='/' component={IndexRoute} store={store}/>
        <Route exact path='/books' component={BooksRoute}/>
        <Route exact path='/books/new' component={BooksNewRoute}/>
        <Route path='/books/:bookId'>
          <BooksDetail />
        </Route>

        <Route path='/*'>
          <Redirect to='/'/>
        </Route>
	    </Switch>
    </ErrorBoundary>
  );
}

const BooksDetail = (props) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { bookId } = useParams();

  return (
    <Switch>
      <Route exact path={path}>
        <BooksDetailRoute bookId={bookId} store={store} history={history} />
      </Route>
      <Route exact path={path + '/edit'}>
        <BooksEditRoute bookId={bookId} store={store} history={history} />
      </Route>
    </Switch>
  )
}

export default withStore(Router);
