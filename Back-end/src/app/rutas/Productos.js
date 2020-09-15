const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
const { json } = require('express');
   
module.exports = (app) => {

    //get de todos los productos
    app.get('/getAllProducts', (req, res, next) => {    

        let querry = `Select * from productos`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });

    });

    //get de los productos por categoria
    app.post('/getProductsBy', (req, res, next) => {    
        
        let querry = `Select * from productos where pr_categoria = '${req.body.categoria}'`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });

    });

        //pedir productos byID
        app.post('/getProductoById', (req, res, next) => {
            let query = `Select * From productos where pr_id = ${req.body.id}`;
    
            conn.query( query, (error, formularios) => {
                console.log(query);
                if (error) res.json({status: 0, message: `${error}`});
                else res.json({status:1, formularios});
    
            });
        });
    

    //post de nuevo producto
    app.post('/newProduct', (req, res, next) => {    

        let querry = `Insert into productos (pr_nombre, pr_existencia, pr_autor, pr_descripcion, pr_foto, pr_precio, pr_categoria) values ('${req.body.nombre}', ${req.body.existencia}, '${req.body.autor}', '${req.body.descripcion}', '${req.body.foto}', ${req.body.precio}, '${req.body.categoria}')`;
        
        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:"Insertado existosamente" ,formularios});

        });

    });


    //alter producto (precio, nombre, autor, cantidad)
    app.post('/editCantidad', (req, res, next) => {    

        let querry = `Update productos set pr_existencia = ${req.body.existencia} where pr_nombre = '${req.body.nombre}'`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });
        
    });

    app.get('/getProductoById', (req, rex, next) => {
        let query = `Select * From productos where pr_id = ${req.body.id}`;

        conn.query( query, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios});

        });
    });
    

}