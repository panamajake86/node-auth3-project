const express = require('express');

const apiRouter = require('./routers/api-router');
const configureMiddleware = require('./middleware/configure-middleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;