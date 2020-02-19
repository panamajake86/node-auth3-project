const router = require('express').Router();

const Users = require('../modules/user-module');
const restricted = require('../middleware/restricted-middleware');
const checkRole = require('../middleware/check-role-middleware');

router.get('/', restricted, checkRole('Admin'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send({ message: 'We released ourselves of our own recognasance.', err }))
});

module.exports = router;