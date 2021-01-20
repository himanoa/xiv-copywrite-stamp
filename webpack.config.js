const path = require('path');
const webpack = require('webpack')

module.exports = ({
  mode
}) => ({
  mode,
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {},
      global: {}
    })
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
});
