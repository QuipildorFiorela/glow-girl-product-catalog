const mysql = require('mysql2');

// Configuración de la conexión
const conexion = mysql.createConnection({
    host: 'localhost',       // o el host donde está tu base (por ej. 127.0.0.1)
    user: 'root',
    password: 'myPONYfio575rela',
    database: 'tienda_accesorios'
});

// Conectar
conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos con el ID ' + conexion.threadId);
});

// Exportar si querés usar la conexión desde otros archivos
module.exports = conexion;
