const app = require('./config/server');
require('./app/rutas/Login-Register')(app);
require('./app/rutas/Courriers-tarjetas')(app);
require('./app/rutas/Pedido')(app);
require('./app/rutas/Productos')(app);
require('./app/rutas/User')(app);

app.listen(app.get("port"), () => 
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`)
);

