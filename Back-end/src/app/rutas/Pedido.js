const conn = require('../../config/serverDB');

module.exports = (app) => {

    //crear pedido, viene vaco, en el checkout se crea el pedido como tal
    app.post('/newPedido', (req, res, next) => {

        let query = `Insert into pedido (u_id, dir_entrega, codigo_postal, compañia, c_nombre, total) values (${req.body.u_id}, '${req.body.dir_entrega}', ${req.body.codigo_postal}, '${req.body.compañia}', '${req.body.c_nombre}', ${req.body.monto})`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Pedido realizado"});

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

    //editar pedido, aqui completamos el pedido
    app.post('/completarPedido', (req, res, next) => {    

        let querry = `Update pedido set dir_entrega='${req.body.direccion}', codigo_postal='${req.body.postal}', estatus='${req.body.estatus}', e_id=${req.body.e_id}, c_id=${req.body.c_id} where p_id = ${req.body.p_id}`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1});

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

    

}