var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    'react': 'commonjs react' 
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ]
  }
}