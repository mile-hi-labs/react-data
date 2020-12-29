const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

function sharedConfig(mode) {
  return {
    mode: mode,
    entry: './src/index.jsx',
    output: {
      path: __dirname + '/lib',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: 'babel-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'demos'),
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

module.exports = environment => {
  let env = environment.production ? 'production' : 'development';
  console.log('Env: ', env);
  let config = sharedConfig(env);

  if (env.production) {
    config.plugins = [
      new CompressionPlugin()
    ]
    return config;
  } else {
    config.devtool = "source-map";
  }
  return config
}

// Webpack devtools
// https://webpack.js.org/configuration/devtool/
// https://webpack.js.org/plugins/eval-source-map-dev-tool-plugin/
