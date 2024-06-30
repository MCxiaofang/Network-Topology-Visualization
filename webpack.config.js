const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ntv.js',
  output: {
    filename: 'ntv.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ntv',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    d3: 'd3'
  }
};
