const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const joinRoot = path.join.bind(path, __dirname);
const joinSrc = joinRoot.bind(path, 'src');

module.exports = {
  devtool: 'source-map',

  entry: fs.readdirSync(joinSrc()).reduce((entries, dir) => {
    if (fs.statSync(joinSrc(dir)).isDirectory()) {
      entries[`${dir}/app`] = joinSrc(dir, 'app.js');
      entries[`${dir}/server`] = joinSrc(dir, 'server.js');
    }

    return entries;
  }, {}),

  resolve: {
    alias: {
      utils: joinRoot('utils'),
    },
  },

  output: {
    path: joinRoot('build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json/, loader: 'json' },
    ],
  },

  plugins: [
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

};
