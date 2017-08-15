import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console */

// Here in distServer.js file we are NOT using Webpack as a middleware, since the build was created via build.js and we only need to host it.

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist')); // PROD: we are serving plain static files

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
