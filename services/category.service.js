const sql = require('../database/db');
const pagination = require('../util/pagination.util');
exports.getAllCategory = function(result) {
    sql.query("Select * from category", function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
exports.getById = function(id, result) {
    sql.query('Select *from category where id = ' + id + '', function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
exports.save = function(category, result) {
    sql_query = "UPDATE category SET name_category='" + category.name_category + "' WHERE id = " + category.id + "";
    var status = false;
    if (!category.id) {
        sql_query = "INSERT INTO category (name_category) VALUES('" + category.name_category + "')";
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
};

exports.delete = function(id, result) {
    sql.query('DELETE FROM category WHERE id = ' + id + '', function(err, res) {
        if (err) {
            result(err);
        } else {
            var sql_query = "SELECT *FROM category";
            sql.query(sql_query, function(err, res) {
                if (err) {
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }
    });
};

exports.count = function(result) {
    sql.query("SELECT COUNT(*) AS count FROM category", function(err, res) {
        if (err) {
            return result(err);
        }
        return result('', res)
    });
}


exports.listdemo = function(param,result){
    const limit = param.limit;
    const page = param.page;
    const keySearch = param.keySearch;
    var sql_query = "SELECT *FROM demo WHERE name LIKE '%" + keySearch + "%' ";
    sql.query(sql_query, function(err, res){
        if(err) return result(err);
         const toTalRecord = res.length;
         if(toTalRecord<=0){
            return result('', {
                type: false,
                message: 'Not find record'
            })
         }

         var startPage = pagination.pagination_start(page, limit, toTalRecord);
          sql_query = "SELECT * FROM demo WHERE name LIKE '%" + keySearch + "%' LIMIT " + startPage + ", " + limit + " ";

          sql.query(sql_query, function(err, res){
            if(err) return result(err);
            return result('', {
                type: true,
                toTalRecord: toTalRecord,
                items: res

            })

          });
    });
}
exports.listdemonotpagi= function(result){
    var sql_query ="SELECT *FROM demo";
    sql.query(sql_query, function(err, res){
        if(err) return result(err);
        return result('', res);
    });
}

exports.savedemo = function(data, result){
    var sql_query ="INSERT INTO demo(name,des) VALUES('"+data.name+"', '"+data.des+"')";
    sql.query(sql_query, function(err, res){
        if(err) return result(err);
        return result('', {
            type: true,
            message: 'Insert success'
        })
    });
}
exports.getByIdDemo = function(data, result){
    var sql_query ="SELECT *FROM demo WHERE id = "+data.id+"";
    sql.query(sql_query, function(err, res){
        if(err) return result(err);
        return result('', {
            type: true,
            item: res
        })
    });
}
exports.deleteDemo = function(data, result){
    var sql_query = "DELETE FROM demo WHERE id = "+data.id+"";
    sql.query(sql_query, function(err, res){
        if(err) return result(err);
        return result('',{
            type: true,
            mess: 'Delete success'
        })
    })
}