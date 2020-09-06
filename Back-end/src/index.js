const app = require('./config/server');
require('./app/rutas/Login-Register')(app);

app.listen(app.get("port"), () => 
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`)
);

