module.exports = function override(config, env) {
  if (env !== 'production') {
    config = { ...config, ...{ devtool: 'cheap-module-eval-source-map' } };
  }
  return config;
}

// Docs:
// https://github.com/timarney/react-app-rewired#readme
