const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mysql-service',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: 'devops_db'
});
module.exports = pool.promise();