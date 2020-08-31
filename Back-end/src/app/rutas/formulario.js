const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
    
module.exports = (app) => {

    app.get('/getUsuarios/:id', (req, res, next) => {

        let querry = `Select * from usuarios where  u_id = ${req.params.id}`;
        conn.query( querry, (error, formularios, cols) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    })

    app.post('/newUsuario', (req, res, next) => {

        let query = `Insert into Usuarios (nombre, apellido, correo, contraseña) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.contraseña}')`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });
};