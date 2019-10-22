const express = require('express');
const postRoutes = express.Router();
const post_controller = require('../controllers/post.controller');
// Defined store route
const authorize = require('../helper/authorize');
// Defined store route

// Defined get data(index or listing) route

// Defined get data(index or listing) route
postRoutes.get('/all', authorize('ADMIN'), post_controller.list);
postRoutes.get('/getById', authorize('ADMIN'), post_controller.getById);
postRoutes.post('/save', authorize('ADMIN'), post_controller.save);
postRoutes.get('/delete', authorize('ADMIN'),post_controller.delete);
postRoutes.get('/active',authorize('ADMIN'), post_controller.active);
postRoutes.get('/count', post_controller.count);
postRoutes.get('/slug', post_controller.slug);
postRoutes.get('/contenPage', post_controller.getContent);
module.exports = postRoutes;