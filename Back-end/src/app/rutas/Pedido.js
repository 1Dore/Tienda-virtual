const conn = require('../../config/serverDB');

module.exports = (app) => {

    //crear pedido, viene vaco, en el checkout se crea el pedido como tal
    app.post('/newPedido', (req, res, next) => {

        let query = `Insert into pedido (u_id) values (${req.body.u_id})`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Pedido realizado"});

        });
    });

    //editar pedido, aqui completamos el pedido
    app.post('/completarPedido', (req, res, next) => {    

        let querry = `Update pedido set dir_entrega='${req.body.direccion}', codigo_postal='${req.body.postal}', estatus='${req.body.estatus}', e_id=${req.body.e_id}, c_id=${req.body.c_id} where p_id = ${req.body.p_id}`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1});

        });
        
    });

    app.post('/getPedidoNulls', (req, res, next) => {    

        let querry = `select * from pedido where u_id = ${req.body.u_id} and dir_entrega is null`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:"Pedido retornado", formularios});

        });
        
    });



    //consultar estatus del pedido
    app.post('/getStatus', (req, res, next) => {    
        
        let querry = `Select estatus from pedido where p_id = ${req.body.p_id}`;
        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });

    });

    //editar estatus del pedido
    app.post('/estatusPedido', (req, res, next) => {    

        let querry = `Update pedido set estatus = ${req.body.estatus} where p_id = ${req.body.p_id}`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1});

        });
        
    });


    app.post('/getPedidos', (req, res, next) => {
        let query = `Select * From pedido Where u_id = ${req.body.u_id}`;

        conn.query(query, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, formularios});
        });
    });

    //guardar carrito
    app.post('/pushCarrito', (req, res, next) => {

        let query = `Insert into carrito (p_id, pr_id, cantidad) values (${req.body.p_id}, ${req.body.pr_id}, ${req.body.cantidad})`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Pedido realizado"});

        });
    });

    // Obtener el Nombre de un Curier
    app.post('/getC_name', (req, res, next) => {
        let query = `Select c_nombre Form courrier Where c_id = ${req.body.c_id}`;
        conn.query(query, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, formularios});
        });
    });
    

    // Obtener el Nombre de un Usuario
    app.post('/getU_name', (req, res, next) => {
        let query = `Select nombre, apellido Form usuarios Where u_id = ${req.body.u_id}`;
        conn.query(query, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, formularios});
        });
    });

    // Obtener el Nombre de un Emisor
    app.post('/getE_name', (req, res, next) => {
        let query = `Select compañia Form emisores Where e_id = ${req.body.e_id}`;
        conn.query(query, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, formularios});
        });
    });


    

    

}