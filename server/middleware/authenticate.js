const {User} = require('../models/User')
module.exports.authenticate = function( req, res, next) {
    const token = req.header('x-auth');
    if (!token) {
        Promise.reject();
    }
    User.findByToken(token).then( (user) => {
        req.user = user;
        req.token = token;
        next();
    })
    .catch(e => res.status(400).send())
}