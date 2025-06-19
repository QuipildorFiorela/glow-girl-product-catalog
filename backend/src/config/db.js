import mysql from 'mysql2/promise';
import envs from "./envs.js";
const {host, user, password, database} = envs.db_config;

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
});
const connection = await pool.getConnection();

try{
    connection.release();
    console.log("Database is connected");
}catch(err){
    console.log(err);
}

export default connection;

/*import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kimba230112*',
    database: 'tienda_accesorios',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;*/
