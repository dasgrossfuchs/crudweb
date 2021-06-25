/* jshint esversion: 6*/

//import modules
const express = require('express');
const Product = require('../models/product');//esquema
const path = require('path');
const product = require('../models/product');
//Create aa routes object
const router = express.Router();
//export our router
module.exports = router;
router.use('/static', express.static('public'));

//consulta por filtro
router.get('/api/product/:productId',(req,res)=>{
    let datoBusqueda = req.params.productId;
    // Product.findOne({price:datoBusqueda},(err,products)=>{
        // Product.find({price:datoBusqueda},(err,products)=>{
        Product.findById(datoBusqueda,(err,resultado)=>{
        if(err) return res.status(500).send({
            message:`Error al realizar la petición : ${err}`
        });
        if(!resultado) return res.status(404).send({
            message:'El producto no existe'
        });
        // res.status(200).send({product: products});
        res.render('editar',{products:resultado});
    }).lean();
    //Agustin Valdés Fuchs
});
//ejemplo de consulta de todos los datos
router.get('/api/product',(req,res)=>{
    Product.find({},(err,resultado)=>{
        if(err) return res.status(500).send({
            message:`Error al realizar la petición : ${err}`
        });
        if(!resultado) return res.status(404).send({
            message: 'No existen resultados'
        })
        // res.status(200).send({product:[resultado]});
        res.render('showproducts',{resultado});
    }).lean();
});

//ejemplo insertar
router.post('/api/product',(req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description; 
    console.log(req.body);
    product.save((err,productStored)=>{
        if(err) return res.status(500).send({
            message:`Error al realizar la petición : ${err}`
        });
        // res.status(200).send({product: productStored});
        res.redirect('/api/product');
    });
});

//Ejemplo modificacion de producto
const putproduct = require('../controllers/putProduct');
router.put('/api/product/:productId',putproduct);

//Borrar un registro
const delproduct = require('../controllers/delProduct');
router.delete('/api/product/:productId',delproduct);



////// RENDERS Y RUTAS  /////

//pagina home
router.get('/',(req,res)=>{
    res.render('home');
    // res.status(200).send('hola mundo')
});
router.get('/insertproduct',(req,res)=>{
    res.render('product');
    // res.status(200).send('hola mundo')
});

//pagina login
router.get('/login',(req,res)=>{
    res.status(200).send('soy login');
});
const newuser = require('../controllers/newuser');
router.get('/user/register',newuser);
const newuserctrl = require('../controllers/storeuser');
router.post('/auth/register',newuserctrl);
const loginctrl = require('../controllers/login');
router.get('/user/login',loginctrl);
const loginusrctrl = require('../controllers/loginuser');
router.post('/auth/login',loginusrctrl);

//este va hasta el final para evitar problemas de enrutamiento
router.use((req,res)=>{
    res.status(404).render('notfound');
    console.log(res.statusCode + res);
});


