const {Schema, model, default: mongoose} = require('mongoose');             //Importamos al libreria de Mongoose para crear Schemas

const ProductSchema = new Schema({                                          //Creamos un nuevo Schema y le asignamos los atributos requeridos

    serial:{type: String, require: true, unique: true},
    name:{type: String, require: true},
    price:{type: Number, require: true},
    description:{type: String, require: true},
    status:{type: String, require: true, enum:['With_Stock','Out_Stock']}
},{timestamps: true});                                                      //TimeStamp nos sirve para manejas las fechas de Creacion y Actualizacion

module.exports = mongoose.model("Product",ProductSchema);                   //Exportamos nuestro Schema con mongoose mediante un modelo para que pueda ser utilizado por el Middleware de json