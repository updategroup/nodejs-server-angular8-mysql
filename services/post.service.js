const sql = require('../database/db');
const pagination = require('../util/pagination.util');

exports.list = function(result) {
    var sql_query = "SELECT category.name_category,posts.* FROM category,posts WHERE posts.id_category=category.id";
    sql.query(sql_query, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
exports.getById = function(id, result) {
    var sql_query = "SELECT posts.* FROM posts WHERE id = " + id + "";
    sql.query(sql_query, function(err, res) {
        if (err) {
            return result(null, err);
        }
        result(null, res);
    });
}

exports.save = function(post, result) {
    var sql_query = "UPDATE posts SET title='" + post.title + "', description='" + post.description + "',content='" + post.content + "',avartar='" + post.avartar + "',date_create='" + post.date_create + "',slug='" + post.slug + "',status=" + post.status + ",id_category = " + post.id_category + " WHERE id=" + post.id + "";
    var status = false;
    if (!post.id) {
        sql_query = "INSERT INTO posts(title,description,content,avartar,date_create,slug,status,id_category) VALUES('" + post.title + "','" + post.description + "','" + post.content + "','" + post.avartar + "','" + post.date_create + "','" + post.slug + "', " + post.status + ", " + post.id_category + ")";
        status = true;
    }
    sql.query(sql_query, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            if (status) {
                return result('', res.insertId);
            } else {
                result('', '');
            }
        }
    });
}

exports.delete = function(id, result) {
    var sql_query = "DELETE FROM posts WHERE id = " + id + "";
    sql.query(sql_query, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            var sql_query = "SELECT category.name_category,posts.* FROM category,posts WHERE posts.id_category=category.id";
            sql.query(sql_query, function(err, res) {
                if (err) {
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }
    });
}
exports.active = function(data, result) {
    var sql_query = "UPDATE posts SET status=" + data.status + " WHERE id = " + data.id + "";
    sql.query(sql_query, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
exports.count = function(result) {
    sql.query("SELECT COUNT(*) AS count FROM posts", function(err, res) {
        if (err) {
            return result(err);
        }
        return result('', res)

    });
}

exports.slug = function(slug, result) {
    var sql_query = "SELECT *FROM posts WHERE slug='" + slug + "'";
    sql.query(sql_query, function(err, res) {
        if (err) {
            return result(err);
        }
        return result('', res)
    });
}
exports.getContent = function(param, result) {
    const limit = param.limit;
    const page = param.page;
    const order = param.order;
    const category = param.category;
    const keySearch = param.keySearch;
    var sqlOrder = '';
    if (order == 'NEWS') {
        sqlOrder = 'ORDER BY date_create DESC';
    } else if (order == 'OLD') {
        sqlOrder = 'ORDER BY date_create ASC';
    }
    var sql_query = "SELECT *FROM posts WHERE status=1 AND title LIKE '%" + keySearch + "%' ";
    if (category) {
        sql_query = "SELECT *FROM posts WHERE id_category =" + category + " AND status=1 AND title LIKE '%" + keySearch + "%'";
    }

    sql.query(sql_query, function(err, res) {
        if (err) return result(err);
        const toTalRecord = res.length;
        if(toTalRecord<=0){
            return result('', {
                type: false
            })
        }
        var _paginStart = pagination.pagination_start(page, limit, toTalRecord);
        sql_query = "SELECT *FROM posts WHERE title LIKE '%" + keySearch + "%' AND status = true "+sqlOrder+"  LIMIT " + _paginStart + ", " + limit + " ";
        if(category){
            sql_query = "SELECT *FROM posts WHERE id_category =" + category + " AND status = true AND  title LIKE '%" + keySearch + "%' " + sqlOrder + " LIMIT " + _paginStart + ", " + limit + " ";
        }
        sql.query(sql_query, function(err, res) {
            if (err) return result(err);
            const data = {
                type: true,
                toTal: toTalRecord,
                items: res    
            }
            return result('', data);
        });
    });
}