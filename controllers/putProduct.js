/* jshint esversion: 6 */

const product = require('../models/product');

module.exports = (req, res)=>{
    let datoModificar = req.params.productId;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);
    product.findByIdAndUpdate(datoModificar,update,(err,products)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`});
        if(!products) return res.status(404).send({message: 'Inexistente'});
        // res.status(200).send({product:products});
        res.redirect('/api/product');
    });
    //Agustin Valdés Fuchs
};