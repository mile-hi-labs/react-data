var path = require('path');
var webpack = require('webpack');

function sharedConfig() {
  return {
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
}

module.exports = env => {
  console.log('Production: ', env.production ? true : false);
  let config = sharedConfig();
  if (env.production) {
    return config;
  }
  config.plugins = [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ];
  return config
}

// Webpack devtools
// https://webpack.js.org/configuration/devtool/