import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { Route, MemoryRouter } from 'react-router';
import 'whatwg-fetch';
import _ from 'lodash';

import configureStore from 'store/configureStore';

import 'styles/app.scss';

const history = createHistory();
const store = configureStore(history);
window.store = store;

export default function Root(props) {
  return (
    <Provider store={store}>
      <MemoryRouter history={history}>
        <Route path="/" component={props.app} />
      </MemoryRouter>
    </Provider>
  );
}
Root.propTypes = {
  app: PropTypes.func.isRequired,
};
