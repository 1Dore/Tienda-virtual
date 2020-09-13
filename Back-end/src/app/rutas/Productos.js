const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
   
module.exports = (app) => {

    //get de todos los productos
    app.get('/getAllProducts', (req, res, next) => {    

        let querry = `Select * from productos`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios})
        });

    });

    //get de los productos por categoria
    app.post('/getProductsBy', (req, res, next) => {    

        let querry = `Select * from productos where pr_categoria = '${req.params.categoria}'`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios})
        });

    });

    //post de nuevo producto
    app.post('/newProduct', (req, res, next) => {    

        let querry = `Insert into productos (pr_nombre, pr_existencia, pr_autor, pr_descripcion, pr_foto, pr_precio) values ('${req.body.pr_nombre}', '${req.body.pr_existencia}', '${req.body.pr_autor}', '${req.body.pr_descripcion}', '${req.body.pr_foto}', '${req.body.pr_precio}')`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios})
        });

    });


    //alter producto (precio, nombre, autor, cantidad)
    app.post('/editCantidad', (req, res, next) => {    

        let querry = `Update productos set pr_existencia = ${req.body.existencia}`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, formularios})
        });
        
    });
    

}