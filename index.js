const express = require('express');                                         //Importamos la libreria express
const {getConnection} = require('./db/mongo_db');                           //Importamos la funcion getConnection del paquete de base de datos

const app = express();                                                      //Iniciamos la aplicacion con express
const port = process.env.PORT;                                              //Definimos el Puerto de la aplicacion (.env ha de tener el puerto configurado (PORT=1234))

app.use(express.json());                                                    //Le indicamos a la aplicacion que usara un Middleware para manejar los formatos Json

const startServer = async () => {                                           //Creamos una funcion Asincrona
    try {
        await getConnection();                                              //Esperamos la conexion de la base datos 
        console.log("Conectado a MongoDB")

        app.get('/', async (req,res) => {                                   //Creamos una ruta de ejemplo con el metodo GET para verificar el estado
           res.send("Hello World, Esto es una Prueba de Servicio");         //Enviamos como respuesta un mensaje
        });

        app.listen(port, () => {                                            //Arrancamos la aplicacion con el puerto seleccionado con la libreria express(listen)
            console.log(`Servidor Corriendo en http://localhost:${port}`);
        })

    } catch (error) {                   
        console.error("Error al conectar con la base de Datos", error);
    }
};

startServer();                                                              //Llamamos a la funcion para que se incialice