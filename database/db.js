var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blognodejsserver'
});
// var connection = mysql.createConnection({
//     host     : 'db4free.net',
//     user     : 'tranquoc113',
//     password : 'Anhthichem113',
//     database : 'blognodejsserver'
// });

connection.connect(function(err) {
    if (err) throw err;

});

module.exports = connection;