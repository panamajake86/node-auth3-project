const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../data/secrets');

const Users = require('../modules/user-module');

router.post('/register', (req, res) => {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 12); 

    Users.add(data)
    .then(reg => {
        const token = genToken(reg);
        res.status(200).json({ created_user: reg, token: token });
    })
    .catch(err => res.status(500).json({ message: 'We released ourselves of our own recognasance.', err }));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(log => {
        if(log && bcrypt.compareSync(password, log.password)) {
            const token = genToken(log);
            res.status(200).json({ username: log.username, token: token });
        } else {
            res.status(401).json({ message: 'Maybe is was Utah.' });
        }
        
    })
    .catch(err => res.status(500).json({ message: 'We released ourselves of our own recognasance.', err }));
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ message: 'Maybe it was Utah.' });
            } else {
                res.send('Son...you got a panty on your head.');
            }
        });
    } else {
        res.end();
    }
});

function genToken(user) {
    const payload = {
        userid: user.id,
        username: user.username,
        roles: ['human of the world']
    };

    const options = { expiresIn: '30min' };
    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
};

module.exports = router;