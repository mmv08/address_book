const path = require('path');
const webpack = require('webpack');

const settings = {
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ]
};

module.exports = settings;
