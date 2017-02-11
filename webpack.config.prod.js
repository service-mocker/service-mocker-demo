const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const joinRoot = path.join.bind(path, __dirname);
const joinSrc = joinRoot.bind(path, 'src');

module.exports = {
  devtool: 'source-map',

  bail: true,

  entry: fs.readdirSync(joinSrc()).reduce((entries, dir) => {
    if (fs.statSync(joinSrc(dir)).isDirectory()) {
      entries[`${dir}/app`] = [
        'service-mocker-polyfills',
        joinSrc(dir, 'app.js'),
      ];
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
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },

  plugins: [
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],

};
