import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { html as JsBeautify } from 'js-beautify';
import { StoreProvider, BaseSerializer } from '@mile-hi-labs/react-data';

import App from 'app';
import Router from 'router';

// Styles
import FarIcons from 'utils/font-awesome/far-icons';
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


const Document = async (req, storeContext, data) => {
  const context = {};
  const helmetContext = {};
  const formattedData = BaseSerializer.serialize(data);

  const JSX = renderToString(
    <HelmetProvider context={helmetContext}>
      <StoreProvider context={storeContext} data={data}>
        <StaticRouter location={req.url} context={context}>
          <App ssrData={data} />
        </StaticRouter>
      </StoreProvider>
    </HelmetProvider>
  )

  const { helmet } = helmetContext;
  const formattedJSX = JsBeautify(JSX);

  const html =
    `<!doctype html>
      <html lang="en" ${helmet.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          <script src="${assets.client.js}" defer crossorigin></script>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${formattedJSX}</div>
          <script>window.REACT_DATA = ${JSON.stringify(formattedData)};</script>
          <style>${FarIcons.dom.css()}</style>
        </body>
      </html>`;

  return { html, context };
};

export default Document;
