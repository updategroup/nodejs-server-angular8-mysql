const express = require('express');
const categoryRoutes = express.Router();


const category_controller = require('../controllers/category.controller');
const authorize = require('../helper/authorize')
    // Defined store route


// Defined get data(index or listing) route
categoryRoutes.get('/all', authorize('ADMIN'), category_controller.list_all_category);
categoryRoutes.get('/getById',authorize('ADMIN'), category_controller.getById);
categoryRoutes.post('/save', authorize('ADMIN'),category_controller.save);
categoryRoutes.get('/delete',authorize('ADMIN'), category_controller.delete);
categoryRoutes.get('/count', category_controller.count);

categoryRoutes.post('/list', category_controller.listdemo);
categoryRoutes.get('/listdemo', category_controller.listdemonotpagi);
categoryRoutes.post('/savedemo', category_controller.savedemo);
categoryRoutes.post('/deletedemo', category_controller.deleteDemo);
categoryRoutes.post('/getByIddemo', category_controller.getByIdDemo);
module.exports = categoryRoutes;