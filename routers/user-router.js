const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../modules/user-module');
const restricted = require('../middleware/restricted-middleware');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send({ message: 'We released ourselves of our own recognasance.', err }))
});

module.exports = router;