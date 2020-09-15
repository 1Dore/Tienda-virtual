const conn = require('../../config/serverDB');

module.exports = (app) => {

    //obtener Direcciones
    app.post('/getDireccionesByUser', (req, res, next) => {
        let query = `Select * From direcciones Where u_id = ${req.body.u_id}`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });
    });

    //agregar direcciones    
    app.post('/newDireccionForUser', (req, res, next) => {

        let query = `Insert into direcciones (u_id, direccion, codigo_posta) values (${req.body.u_id}, '${req.body.direccion}', '${reg.body.codigo_postal})'`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});
            else res.json({status: 1, menssage: "Insercion realizada"});
        });
    });
    
    //editar direcciones
    app.post('/editDireccion', (req, res, next) => {    

        let querry = `Update direcciones set direccion = ${req.body.direccion} where dir_id = ${req.body.dir_id} `;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:`Direccion editadoa, la nueva direccion es: ${req.boy.direccion}`});

        });
    });
    
    //editar Codigo Postal
    app.post('/editCodigoPostal', (req, res, next) => {    

        let querry = `Update direcciones set codigo_postal = ${req.body.codigo_postal} where dir_id = ${req.body.dir_id} `;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:`Codigo Postal editado, el nueva codigo postal es: ${req.boy.codigo_postal}` });

        });
    });
        

    //eliminar direccion
    app.post('/eliminarDireccionByUser', (req, rex, next) => {
        let query = `Delete From direcciones Where dir_id = ${req.body.dir_id}`;
        if(error) res.status(500).json({status: 0, message: "No se pudo eliminar correctamente"});
            else res.json({status: 1, menssage: "Eliminado con exito"});
    });

    

    //--------------------------------------------

    //Obtener Tarjetas
    app.post('/getTarjetasByUser', (req, res, next) => {
        let query = `Select * From tarjeta Where u_id = ${req.body.u_id}`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });
    });

    //agregar tarjetas
    app.post('/newTarjetaForUser', (req, res, next) => {

        let query = `Insert into tarjetas (u_id, e_id, num_tar) values (${req.body.u_id}, ${req.body.e_id}, ${reg.body.num_tar})`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});
            else res.json({status: 1, menssage: "Insercion realizada"});
        });
    }); 

    //eliminar tarjeta
    app.post('/eliminarTarjetaByUser', (req, rex, next) => {
        let query = `Delete From tarjetas Where t_id = ${req.body.t_id}`;
        if(error) res.status(500).json({status: 0, message: "No se pudo eliminar correctamente"});
            else res.json({status: 1, menssage: "Eliminado con exito"});
    });


}