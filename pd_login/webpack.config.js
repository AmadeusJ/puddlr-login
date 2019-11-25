'use strict';
const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, './frontend/dist'),
        filename: '[name].build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                  'style-loader',
                  'css-loader', 
                  {
                    loader: 'sass-loader',
                  }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
// Set public path for react
// new webpack.DefinePlugin({
//   'process.env': {
//     PUBLIC_URL: '"/static/"'
//   }
// })

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),

    //   module.exports.optimization.minimize = true,

      new webpack.LoaderOptionsPlugin({
        // minimize: true
      }),
      new BundleTracker({
        filename: './webpack-stats.json'
      })
    ])
}