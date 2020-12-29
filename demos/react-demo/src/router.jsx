import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { withStore } from '@mile-hi-labs/react-data';
import { withToast } from 'contexts/toast-context';

// Routes
import IndexRoute from './routes/index';
import BooksRoute from './routes/books/index';
import BooksNewRoute from './routes/books/new';
import BooksDetailRoute from './routes/books/detail';
import BooksEditRoute from './routes/books/edit';

// Utils
import ErrorBoundary from './utils/error-boundary';


const Router = (props) => {
  const { store, toast } = props;
  const passedProps = { store: store, toast: toast }

  // Render
  return (
  	<ErrorBoundary>
	    <Switch>
	      <Route exact path='/' render={routeProps => <IndexRoute {...passedProps} {...routeProps}/>} />
        <Route exact path='/books' render={routeProps => <BooksRoute {...passedProps} {...routeProps}/>} />
        <Route exact path='/books/new' render={routeProps => <BooksNewRoute {...passedProps} {...routeProps}/>} />
        <Route path='/books/:bookId'>
          <BooksDetail {...passedProps} />
        </Route>

        <Route path='/*'>
          <Redirect to='/'/>
        </Route>
	    </Switch>
    </ErrorBoundary>
  );
}

const BooksDetail = (props) => {
  const { path } = useRouteMatch();
  const { bookId } = useParams();

  return (
    <Switch>
      <Route exact
        path={path}
        render={routeProps => (
          <BooksDetailRoute bookId={bookId} {...props} {...routeProps} />
        )}
      />
      <Route exact
        path={path + '/edit'}
        render={routeProps => (
          <BooksEditRoute bookId={bookId} {...props} {...routeProps} />
        )}
      />
    </Switch>
  )
}

export default withStore(withToast(Router));
