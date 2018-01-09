const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    'react-awesome-button': ['./src/demo/demo.js'],
  },
  output: {
    path: path.resolve(__dirname, 'demo/website'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-awesome-button',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64:4]',
              },
            },
            'postcss-loader',
            'sass-loader'],
        }),
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'react-awesome-button.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

module.exports = config;
