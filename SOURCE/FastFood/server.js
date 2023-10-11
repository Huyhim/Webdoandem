const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const express = require('express');
const next = require('next');
const mobxReact = require('mobx-react');
const app = next({ dev, dir: './src' });
const routes = require('./src/routes/routes');

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query, route);
});

mobxReact.useStaticRendering(true);

app.prepare().then(() => {
  express()
    .use('/robots.txt', express.static('./src/static/robots.txt'))
    .use(handler)
    .listen(port);
});
