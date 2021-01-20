import 'cross-fetch/polyfill';
import Express from 'express';
import { matchPath } from 'react-router-dom';
import { Store } from '@mile-hi-labs/react-data';
import Routes from 'routes';
import Document from 'document';
import * as Adapters from 'adapters';
import * as Models from 'models';
import * as Serializers from 'serializers';


async function renderDocument(req) {
  let apiDomain = 'https://library-api.milehilabs.dev';
  let storeContext = new Store({ apiDomain: apiDomain, adapters: Adapters, models: Models, serializers: Serializers });
  let route = Routes.find(route => matchPath(req.url, route));
  let data = (route && route.component.getInitialProps) ? await route.component.getInitialProps(storeContext, req.params) : null;
  let { html, context } = await Document(req, storeContext, data);
  // console.log('Document: ', html);
  return { html, context };
}

const server = Express();
server.disable('x-powered-by')
server.use(Express.static(process.env.RAZZLE_PUBLIC_DIR))
server.get('/favicon.ico', async (req, res, next) => res.status(200).json({}));

server.get('/books/:bookId/*', async (req, res, next) => {
  try {
    let { html, context } = await renderDocument(req);
    return context.url ? res.redirect(301, context.url) : res.send(html);
  } catch (e) {
    next(e);
  }
});

server.get('/*', async (req, res, next) => {
  try {
    let { html, context } = await renderDocument(req);
    return context.url ? res.redirect(301, context.url) : res.send(html);
  } catch (e) {
    next(e);
  }
});

server.use(function(error, req, res, next) {
  res.status(error.code || 500).send(error);
});

export default server;
