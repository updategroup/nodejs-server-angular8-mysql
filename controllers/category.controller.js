const Category = require('../models/category.model');
const categoryService = require('../services/category.service');
exports.list_all_category = function(req, res) {
    categoryService.getAllCategory(function(err, categories) {
        if (err) {
            return res.send(err);
        }
        return res.status(201).send({
            type: true,
            items: categories
        })
    });
};

exports.getById = function(req, res) {
    const id = req.param('id');
    categoryService.getById(id, function(err, category) {
        if (err) {
            return res.send(err, 'Error lỗi');
        }
        return res.status(201).send({
            type: true,
            item: category
        })
    });
};

exports.save = function(req, res) {
    var category = new Category(req.body);
    if (!category.name_category) {
        return res.status(400).send({ type: false, message: 'Provide name ' });
    }
    categoryService.save(category, function(err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(err, '    :data:  ', data);
        if (data) {
            return res.status(201).send({
                type: true,
                id: data
            })
        }

        return res.status(201).send({
            type: true
        })
    });
};

exports.delete = function(req, res) {
     const id = req.param('id');
    categoryService.delete(id, function(err, categories) {
        if (err) {
            return res.status(404).send({ type: false });
        }
        return res.status(201).send({
            type: true,
            items: categories
        })
    });
}
exports.count = function(req, res) {
    categoryService.count(function(err, data) {
        if (err) {
            return res.status(404).send({ type: false });
        }
        return res.status(201).send({
            type: true,
            quanty: data
        })
    });
}

exports.listdemo = function(req, res){
    const _data = req.body;

    if(!_data.limit || !_data.page){
         return res.status(404).send({ type: false, message: 'Provide limit or page Current' });
    }
    categoryService.listdemo(_data,function(err, data) {
        if (err) {
            return res.status(404).send({ type: false, message: 'err' });
        }
        return res.status(201).send(data)
    });
}
exports.listdemonotpagi= function(req, res){
    categoryService.listdemonotpagi(function(err, data) {
        if (err) {
            return res.status(404).send({ type: false, message: 'err' });
        }
        return res.status(201).send({
            type: true,
            items: data,
            toTalRecord: data.length
        })
    });
}
exports.savedemo = function(req, res){
    const _data = req.body;
    if(!_data.name || !_data.des){
         return res.status(404).send({ type: false, message: 'Provide name or des' });
    }
    categoryService.savedemo(_data,function(err, data) {
        if (err) {
            return res.status(404).send({ type: false, message: 'err' });
        }
        return res.status(201).send(data)
    });
}
exports.getByIdDemo = function(req, res){
    const _data = req.body;
    console.log(_data.id);
    if(!_data.id){
         return res.status(404).send({ type: false, message: 'Provide id' });
    }
    categoryService.getByIdDemo(_data,function(err, data) {
        if (err) {
            return res.status(404).send({ type: false, message: err });
        }
        return res.status(201).send(data)
    });
}

exports.deleteDemo = function(req, res){
    const _data = req.body;
    console.log(_data.id);
    if(!_data.id){
         return res.status(404).send({ type: false, message: 'Provide id' });
    }
    categoryService.deleteDemo(_data,function(err, data) {
        if (err) {
            return res.status(404).send({ type: false, message: err });
        }
        return res.status(201).send(data)
    });
}