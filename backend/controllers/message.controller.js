//COTROLLERS: CONTIENE EL CONJUNTO DE FUNCIONES QUE VAN A SER LLAMADOS LUEGO EN LAS RUTAS!

const conexion = require('../dbMysql');

//CONTROLLERS
const getTable = function(req, res) {
    conexion.query('SELECT * FROM productos', (error, resultados) => {
        if (error) throw error;
        res.json({ mensaje: resultados }); // <- respuesta dentro del callback query
    });
};


//de este archivo yo quiero exportar esta function
module.exports = {
    getTable: getTable
}