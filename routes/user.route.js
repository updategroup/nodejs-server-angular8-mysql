const express = require('express');
const userRoutes = express.Router();
const user_controller = require('../controllers/user.controller');
// Defined store route

// Defined get data(index or listing) route
// user_controller.get('/all', post_controller.list);
userRoutes.post('/register', user_controller.save);
userRoutes.get('/authenticate', user_controller.authenticate);
module.exports = userRoutes;