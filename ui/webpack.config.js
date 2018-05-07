var debug = process.env.NODE_ENV !== "prod";
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/main.js",
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties', 'react-html-attrs', 'transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.(s[ac]ss|less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192}
          },
          {
            loader: 'file-loader',
            options: { limit: 10000}
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "main.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false})
  ],
  devServer: {
    historyApiFallback: true
  }
};
