const express = require('express');
// const session = require('express-session');
// const sessionStore = require('connect-session-knex')(session);

const jwt = require('jsonwebtoken');

const apiRouter = require('./routers/api-router');
const configureMiddleware = require('./middleware/configure-middleware');

const server = express();

// const sessionOptions = {
//     name: "HiMcdonnagh",
//     secret: "turntotheright",
//     cookie: {
//         maxAge: 1000 * 60 * 30,
//         secure: false,
//         httpOnly: true
//     },
//     resave: false,
//     saveUninitialized: false,

//     store: new sessionStore({
//         knex: require('./data/config-db.js'),
//         tablename: 'sessions',
//         sidfieldname: 'sid',
//         createtable: true,
//         clearInterval: 1000 * 60 * 60
//     })
// }

configureMiddleware(server);

// server.use(session(sessionOptions));
server.use('/api', apiRouter);

server.get('/token', (req, res) => {
    const payload = {
        subject: 'currentuser',
        userid: 'jgifford',
        favoriteMovie: 'Raising Arizona'
    };

    const secret = 'everybodyfreeze';
    const options = {
        expiresIn: '30min'
    };

    const token = jwt.sign(payload, secret, options);

    res.json(token);
});

module.exports = server;