var sql = require('../database/db');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.save = async function(user, result) {
    var sqlQuery = "SELECT COUNT(*) AS count FROM user WHERE email='" + user.email + "'";
    sql.query(sqlQuery, function(err, res, fields) {
        if (!err) {
            if (res[0].count > 0) {
                return result('', { email: true });
            }
            let hashPass = bcrypt.hashSync(user.password, 10);
            sqlQuery = "INSERT INTO user (email,password) VALUES('" + user.email + "','" + hashPass + "')";
            sql.query(sqlQuery, function(err, res, fields) {
                if (!err) {
                    const userId = res.insertId;
                    sqlQuery = "SELECT id FROM role WHERE role_name='USER'";
                    sql.query(sqlQuery, function(err, res) {
                        const roleId = res[0].id;
                        if (!err) {
                            sqlQuery = "INSERT INTO user_infor (role_id,user_id,fullName) VALUES('" + roleId + "','" + userId + "', '" + user.fullName + "')";
                            sql.query(sqlQuery, function(err, res, fields) {
                                if (!err) {
                                    return result('', res);
                                }
                                result(err);
                            });
                        } else {
                            result(err);
                        }
                    });

                }
            });
        } else {
            result(err);
        }
    });
}

exports.authenticate = async function(user, result) {
    var sqlQuery = "SELECT id, password FROM user WHERE email = '" + user.email + "'";
    sql.query(sqlQuery, function(err, res) {
        if (!err) {
            if (res.length > 0) {
                var userId = res[0].id;
                if (bcrypt.compareSync(user.password, res[0].password)) {
                    sqlQuery = "SELECT role_id, fullName FROM user_infor WHERE user_id='" + userId + "'";
                    sql.query(sqlQuery, function(err, res) {

                        if (!err) {
                            var fullName = res[0].fullName;
                            sqlQuery = "SELECT role_name FROM role WHERE id ='" + res[0].role_id + "'";
                            sql.query(sqlQuery, function(err, res) {
                                console.log('1: ', res);
                                if (!err) {
                                    if (res.length > 0) {
                                        const token = jwt.sign({ sub: userId, role: res[0].role_name }, config.secret);
                                        user.fullName = fullName;
                                        user.role = res[0].role_name;
                                        const { password, ...userWithoutPassword } = user;
                                        result('', {...userWithoutPassword, token });
                                    }
                                }
                            })
                        }
                    });
                } else {
                    result('Incorrect');
                }
            } else {
                result('Incorrect');
            }

        }
    });
}