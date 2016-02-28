import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';

import Index from './index';
import PostItem from './components/post/PostItem';
import ArchiveList from './components/archive/ArchiveList';
import NotFound from './components/notfound/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/:year/:month/:slug" component={PostItem} />
    <Route path="/archive" component={ArchiveList} />
    <Route path="*" component={NotFound}/>
  </Route>
);

export default routes;
