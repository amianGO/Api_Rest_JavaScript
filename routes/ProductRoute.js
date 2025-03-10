const {Router, json} = require('express');                          //Importamos Router de express para manejar las Rutas
const { validationResult, check} = require('express-validator');    //validationResult y Check, nos permitiran hacer comprobaciones en los daots
const Product = require('../models/Product');                       //Importamos nuestro modelo Product

const router = Router();                                            //Inicializamos el Router 

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/', async (req,res) => {                                //Creamos el metodo GET con una funcion asincrona 
    try {
        const Products = await Product.find();                      //Buscamos los elementos en la base de datos (Utilizamos await ya que al manejar bases de datos, debemos esperar una respuesta)
        res.json(Products);                                         //Respondemos con los Productos encontrados en formato Json
    } catch (error) {
        console.error(error);                                       
        res.status(500).json({error:"Error al Mostrar los Productos"})  //Enviamos un Codigo de Estado 500 con el mensaje de error
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/',                                                    //Creamos el metodo POST 
    [
        check('serial',"El Campo Seriañ no Puede estar vacio").not().isEmpty(),             //Verificamos que los campos no esten Vacios
        check('name',"El campo Nombre no puede estar Vacio").not().isEmpty(),
        check('price',"El campo precio no puede estar Vacio").notEmpty(),                   //Otra forma de verificar que los campos no estan vacios
        check('description',"El campo Description no puede estar Vacio").notEmpty(),
        check('status',"El campo Status debe de definirse como With_Stock o Out_Stock").isIn(['With_Stock','Out_Stock'])    //Verificamos que el campo Tenga alguno de los 2 valores seleccionados
    ],

    async (req, res) => {                                           //Creamos una funcion Asincrona
        try {
            const errors = validationResult(req);                   //Verificamos si hay errores
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});  //Si hay errores enviamos un codigo de estado 400 junto con el error en cuestion 
            };

            let {
                serial, name,
                price, description,
                status
            } = req.body;                                           //Creamos una instancia de los atributos, utilizamos req.body para tomar los datos del archivo Json

            const product = new Product({                           //Seleccionamos los Atributos que crearan el nuevo Producto
                serial,name,
                price,description,
                status
            });

            await product.save();                                   //Guardamos en la base de datos el Producto
            res.status(201).json(product);                          //Enviamos un codigo de estado 201 Created junto con el Producto creado en formato Json
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Erro al Guardar el Producto"})            
        }
    }
)

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.put('/:id',
    [
        check('serial',"El Campo Serial Es requerido").notEmpty(),
        check('name',"El campo Name es Requerido").notEmpty(),
        check('price', "El campo Price es Requerido").notEmpty(),
        check('description',"El campo Description es Requerido").notEmpty(),
        check('status', "El campo Status debe de ser With_Stock, Out_Stock").isIn(['With_Stock','Out_Stock'])
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
    
            let {
                serial, name,
                price, description,
                status
            } = req.body;
    
            const product = await Product.findByIdAndUpdate(
                req.params.id,{
                    serial: req.body.serial,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    status: req.body.status
                },{new: true}
            );
    
            res.json(product)
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error al Actualizar el Producto"})
        }
    }
);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id',
    async (req,res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).json({msg: "Producto no Encontrado"})
            }

            await Product.findByIdAndDelete(req.params.id);
            res.json({msg: "Producto Eliminado Correctamente"});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Error al eliminar el Producto"});
        }
    }
)

module.exports = router;                                             //Exportamos el router para que pueda ser manejado en el index