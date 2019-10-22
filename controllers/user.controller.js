var User = require('../models/user.model');
const userService = require("../services/user.service");
exports.save = function(req, res) {
    var user = new User(req.body);
    if (!user.fullName || !user.email || !user.password) {
        return res.status(400).send({ type: false, message: 'Provide all ' });
    }
    userService.save(user, function(err, data) {
        if (err) {
            return res.status(400).send({ type: false, message: err });
        }
        if (data.email) {
            return res.status(201).send({
                type: false,
                email: true,
                message: 'Email valid'
            })
        }
        if (data) {
            return res.status(201).send({
                type: true
            })
        }
    });
};

exports.authenticate = function(req, res, next) {
    var user = {
        email: req.param('email'),
        password: req.param('password')
    }
    if (!user.email || !user.password) {
        return res.status(400).send({ type: false, message: 'Provide all ' });
    }
    userService.authenticate(user, function(err, data) {
        if (err) {
            console.log(err);
            return res.send({ type: false, message: err });
        }
        return res.status(201).send(data);
    });
    // .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    // .catch(err => next(err));
}