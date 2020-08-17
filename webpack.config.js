var path = require('path');
var webpack = require('webpack');

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  console.log('Production: ', env.production);

  if (env.production) {
    return {
      mode: 'production',
      entry: './src/index.js',
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
  }

  return {
      mode: 'production',
      entry: './src/index.js',
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
      plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
      ],
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
}

// Webpack devtools
// https://webpack.js.org/configuration/devtool/