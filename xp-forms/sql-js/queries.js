var promise = require('bluebird');
var mysql = require('mysql');
var uuid = require('uuid-random');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'informacion_xp',
};

const pool = mysql.createPool(config);

module.exports = {
    getTest: function(req, res, next) {
        const db = promise.promisifyAll(pool);

        db.queryAsync('SELECT * FROM perfil').then(function(data){
            data[0].uuid = uuid();
            res.status(200)
            .json(data);
        });
    }
};