const mysql = require('mysql')
const promisify = require('util').promisify
const database = require('./keys')

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion a la base de datos ha sido cerrada')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Demasiadas conexiones a la base da datos')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Conexion a la base de datos rechazada')
        }
    }
    if(connection) connection.release()
    console.log('Base de datos conectada')
    return;
});

pool.query = promisify(pool.query)

module.exports = pool