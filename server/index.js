import express from 'express';
import compression from 'compression';
import path from 'path';

import config from './config';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../webpack.config.dev');
  const compiler = require('webpack')(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.disable('x-powered-by');

app.use(compression());
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

var posts = [];
var settings = {};

import Firebase from 'firebase';
var ref = new Firebase(config.firebase.url);
ref.child('/posts').on('value', (snapshot) => {
  posts = snapshot.val();
});
ref.child('/settings').on('value', (snapshot) => {
  settings = snapshot.val();
});

const renderFullPage = (html, initialState) => {
  const cssPath = process.env.NODE_ENV === 'production'
    ? `${config.cdn}/assets/dist/${config.assets.main.css}`
    : '';

  const css = `<link rel="stylesheet" media="all" href="${cssPath}">`;

  const jsPath = process.env.NODE_ENV === 'production'
    ? `${config.cdn}/assets/dist/${config.assets.main.js}`
    : '/assets/bundle.js';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>srn.io - Søren Brokær</title>
        ${process.env.NODE_ENV === 'production' ? css : ''}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script src="${jsPath}"></script>
      </body>
    </html>
  `;
};

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';

import routes from '../shared/routes';

app.use((req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found!');
    }

    const initialState = {settings, posts};
    const store = configureStore(initialState);

    const initialView = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const finalState = store.getState();

    res.status(200).end(renderFullPage(initialView, finalState));
  });
});

app.listen(config.port, err => {
  if (err) {
    throw err;
  }

  console.log(`server running on port ${config.port}`);
});
