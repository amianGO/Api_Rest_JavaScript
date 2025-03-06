const mongoose = require("mongoose");       //Importamos la libreria mongoose
require('dotenv').config();                 //Importamos la libreria dotenv para utilizar el archivo .en

const getConnection = async () => {         //Creamos una funcion Asincrona pues estamos trabajando con una base de datos
    try {
        const url = process.env.URL_MONGO; //Este archivo procesara los datos que creamos en el archivo (.env) URL_MONGO=url de tu db en mongo

        await mongoose.connect(url);        //Esperamos a que el servidor nos de una respuesta, por eso await
        console.log("Conexion Exitosa");
    } catch (error) {
        console.error(error);               //Imprimimos el Error en consola
    }
}

module.exports = {                          //Exportamos la funcion para poder utilizarla en otros archivos
    getConnection
}