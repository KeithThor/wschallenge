// Imports: Dependencies
const path = require('path');
// Webpack Configuration
const config = {
  entry: ['babel-polyfill', './assets/js/app.js'],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [],
  watch: true,
  devtool: "source-map",
  devServer: {
    publicPath: "/dist/",
  }
};
module.exports = config;