module.exports = (req, res, next) => {
    if (req.session.loggedin && (req.session.loggedin === true)) {
        next();
    } else {
        res.status(400).json({ message: 'you’re young and you got your health, what you want with a job?' })
    }
};