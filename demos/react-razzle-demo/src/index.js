import Express from 'express';
var App = require('./server').default;
const Port = 4200;

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      App = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

export default Express()
  .use((req, res) => App.handle(req, res))
  .listen(Port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${Port}`);
  });
