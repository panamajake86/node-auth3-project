const express = require('express');
const session = require('express-session');
const sessionStore = require('connect-session-knex')(session);

const apiRouter = require('./routers/api-router');
const configureMiddleware = require('./middleware/configure-middleware');

const server = express();

const sessionOptions = {
    name: "HiMcdonnagh",
    secret: "turntotheright",
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new sessionStore({
        knex: require('./data/config-db.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

configureMiddleware(server);

server.use(session(sessionOptions));
server.use('/api', apiRouter);

module.exports = server;