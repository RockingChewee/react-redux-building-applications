import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

// Here in srcServer.js file we are using Webpack as a middleware for Express server for seamless bundling.
// In distServer.js we don't use it, since we build the application via build.js and using the server only for hosting the build.

const port = 3002;
const app = express(); // creating instance of express
const compiler = webpack(config); // getting a compiled webpack config

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) { // since this is a one page app, we are serving index.html for all requests
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
