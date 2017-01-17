const fs = require('fs');
const path = require('path');
const express = require('express');
const rewrite = require('express-urlrewrite');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config.dev');

const joinSrc = path.join.bind(path, __dirname, 'src');

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.publicPath,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
  },
}));

fs.readdirSync(joinSrc()).forEach((file) => {
  if (fs.statSync(joinSrc(file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'));
  }
});

app.use(express.static(joinSrc()));

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000, Ctrl+C to stop');
});
