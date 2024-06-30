const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ntv.js',
  output: {
    filename: 'ntv.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module' // 指定导出为 ES6 模块
    },
    environment: {
      module: true // 确保输出的代码使用 ES6 模块语法
    }
  },
  experiments: {
    outputModule: true // 启用模块输出
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
  }
};
