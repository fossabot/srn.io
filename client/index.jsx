import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ga from 'ga-react-router'

import { configureStore } from '../shared/redux/store/configureStore';

import routes from '../shared/routes';
const store = configureStore(window.__INITIAL_STATE__);

const node = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  history.listen(location => {
    ga('send', location);
  });
}

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), node);

if (process.env.NODE_ENV !== 'production') {
  if (!node || !node.firstChild || !node.firstChild.attributes || !node.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
