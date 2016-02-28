var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SaveAssetsJson = require('assets-webpack-plugin');

module.exports = {
  bail: true,

  debug: false,

  profile: false,

  devtool: 'source-map',

  entry: __dirname + "/client/index.jsx",

  output: {
    path: __dirname + '/assets/dist/',
    filename: 'bundle.[hash].min.js'
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css')
      },
      {
        test: /\.jsx*$/,
        exclude: 'node_modules',
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true)
      }
    }),
    new ExtractTextPlugin('styles.[hash].min.css'),
    new SaveAssetsJson({
      path: __dirname + '/assets/dist/',
      filename: 'assets.json'
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify(process.env.GA_TRACKING_CODE)
    })
  ]
};
