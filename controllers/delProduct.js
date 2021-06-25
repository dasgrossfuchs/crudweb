/* jshint esversion: 6 */

const { response } = require("express");
const Product = require("../models/product");


module.exports = (req, res)=>{
    let datoBusqueda =req.params.productId;
    Product.findById(datoBusqueda,(err,product)=>{
        if(err)return res.status(500).send({message:`error al mandar el producto ${datoBusqueda}`});
        product.remove(err=>{
            if(err)return res.status(500).send({message:`error al mandar el producto ${datoBusqueda}`});
            // res.status(200).send({message:'El producto fue eliminado exitosamente'});
            res.redirect('/api/product');
        })
    });
};