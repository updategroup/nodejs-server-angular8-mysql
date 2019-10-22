const postService = require('../services/post.service');
const Posts = require('../models/post.model');

exports.list = function(req, res) {
    postService.list(function(err, posts) {
        if (err) {
            return res.status(400).send({ type: false, message: err });
        }
        return res.status(201).send({
            type: true,
            items: posts
        })
    });
};

exports.getById = function(req, res) {
     const id = req.param('id');
    postService.getById(id, function(err, post) {
        if (err) {
            return res.status(400).send({ type: false, message: err });
        }
        return res.status(201).send({
            type: true,
            item: post
        })
    });
};

exports.save = function(req, res) {
    var post = new Posts(req.body);
    if (!post.title) {
        return res.send({ type: false, message: 'Provide name ' });
    }
    postService.save(post, function(err, data) {
        if (err) {
            return res.send({ type: false, message: 'Save Failure ' });
        }
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
    postService.delete(id, function(err, posts) {
        if (err) {
            return res.status(400).send({ type: false, message: 'DELETE Failure ' });
        }
        return res.status(201).send({
            type: true,
            items: posts
        })
    });
}
exports.active = function(req, res) {
    var param = {
        status: req.param('status'),
        id: req.param('id')
    }
    postService.active(param, function(err, posts) {
        if (err) {
            return res.status(400).send({ type: false, message: 'UPDATE active Failure ' });
        }
        return res.status(201).send({
            type: true
        })
    });
}
exports.count = function(req, res) {
    postService.count(function(err, data) {
        if (err) {
            return res.status(404).send({ type: false });
        }
        return res.status(201).send({
            type: true,
            quanty: data
        })
    });
}
exports.slug = function(req, res) {
    const slug = req.param('slug');
    postService.slug(slug, function(err, data) {
        if (err) {
            return res.status(404).send({ type: false });
        }
        return res.status(201).send({
            type: true,
            item: data
        });
    });
}
exports.getContent = function(req, res) {
    const _page = {
        page: req.param('page'),
        limit: req.param('limit'),
        order: req.param('order'),
        category: req.param('category'),
        keySearch: req.param('keySearch')
    }
console.log('parma:     ',_page);
    if (!_page.page || !_page.limit) {
        return res.status(404).send({ type: false, message: 'Provide name ' });
    }
    postService.getContent(_page, function(err, data) {
        if (err) return res.send({ type: false, message: err });
        return res.status(201).send(data);
    });

}