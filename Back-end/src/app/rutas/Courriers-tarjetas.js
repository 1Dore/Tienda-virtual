const conn = require('../../config/serverDB');

module.exports = (app) => {

    //agregar courier
    app.post('/newCourrier', (req, res, next) => {

        let query = `Insert into courrier (c_ip, c_nombre) values ('${req.body.ip}', '${req.body.nombre}')`;
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});
            else res.json({status: 1, menssage:"Insercion realizada"});

        });
    });

    //editar courier
    app.post('/editCourrier', (req, res, next) => {    

        let querry = `Update courrier set c_ip = ${req.body.ip} where c_nombre = '${req.body.nombre}'`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:`Courrier editado, la nueva ip es: ${req.body.ip}` });

        });
        
    });

    

    //agregar emisor
    app.post('/newEmisor', (req, res, next) => {

        let query = `Insert into emisores (e_ip, compañia) values ('${req.body.ip}', '${req.body.nombre}')`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });

    //editar emisor
    app.post('/editEmisor', (req, res, next) => {    

        let querry = `Update emisores set e_ip = ${req.body.ip} where compañia = '${req.body.nombre}'`;

        conn.query( querry, (error, formularios) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status:1, message:`Courrier editado, la nueva ip es: ${req.body.ip}` });

        });
        
    });

    //obtener ip de emisor
    app.post('/getEmisorIP', (req, res, next) => {

        let querry = `Select e_ip from emisores where compañia = '${req.body.nombre}'`;

        conn.query(querry, (err, formularios) => {

            if (err) res.json({status: 0, message: `${err}`});
            else res.json({status:1, message:"Emisor encontrado", formularios});
            
        })

    });

    //obtener ip de courrier
    app.post('/getCourrierIP', (req, res, next) => {

        let querry = `Select c_ip from courrier where c_nombre = '${req.body.courrier}'`;

        conn.query(querry, (err, formularios) => {

            if (err) res.json({status: 0, message: `${err}`});
            else res.json({status:1, message:"Emisor encontrado", formularios});
            
        })

    });

    app.get('/getAllCourriers', (req, res, next) => {

        let querry = `Select * from courrier`;

        conn.query(querry, (err, formularios) => {

            if(err) res.json({status:0, message: `${err}`});
            else res.json({status:1, message:"retornando todos los courriers", formularios});

        });

    });

    app.get('/getAllEmisores', (req, res, next) => {

        let querry = `Select * from emisores`;

        conn.query(querry, (err, formularios) => {

            if (err) res.json({status: 0, message: `${err}`});
            else res.json({status:1, message:"Emisor encontrado", formularios});
            
        })

    });
}
