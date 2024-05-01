const path = require('path');

const config = {
  entry: {
    main: ["./src/index.jsx"]
  },
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      }
    ]
  }
};

module.exports = config;
