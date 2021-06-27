/* jshint esversion: 6*/

//import modules
const express = require('express');
const path = require('path');
const Product = require('../models/product');//esquema
const product = require('../models/product');
const authMW = require('../MiddleWare/authmw');
const reIfAuth = require('../MiddleWare/reIfAuth');
const lOc = require('../controllers/logOut');
const putPrc = require('../controllers/putProduct');
const delPrc = require('../controllers/delProduct');
const regUserC = require('../controllers/storeuser');
const regUserV = require('../controllers/newuser');
const lIV = require('../controllers/login');
const lIC = require('../controllers/loginuser');

//Create a routes object
const router = express.Router();
//export our router
module.exports = router;
router.use('/static', express.static('public'));
const expressSession = require('express-session');

//Activacion de las sesiones (cookies)
router.use(expressSession({
    secret:'ittgogalgos',
    resave:true,
    saveUninitialized:true
}));
//Variables Globales
router.use((req,res,next)=>{
    res.locals.loggedIn = req.session.userId || null;
    next();
});

//consulta por filtro
router.get('/api/product/:productId',authMW,(req,res)=>{
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
router.get('/api/product',authMW,(req,res)=>{
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
router.post('/api/product',authMW,(req,res)=>{
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
router.put('/api/product/:productId',authMW,putPrc);

//Borrar un registro
router.delete('/api/product/:productId',authMW,delPrc);



////// RENDERS Y RUTAS  /////

//pagina home
router.get('/',(req,res)=>{
    // console.log(req.session);
    res.render('home');
    // res.status(200).send('hola mundo')
});
router.get('/insertproduct',authMW,(req,res)=>{
    res.render('product');
    // res.status(200).send('hola mundo')
});
router.get('/auth/logout',lOc);

//pagina login
// router.get('/login',(req,res)=>{
//     res.status(200).send('soy login');
// });

router.get('/user/register',reIfAuth,regUserV);
router.post('/auth/register',reIfAuth,regUserC);
router.get('/user/login',reIfAuth,lIV);
router.post('/auth/login',reIfAuth,lIC);



//este va hasta el final para evitar problemas de enrutamiento
router.use((req,res)=>{
    res.status(404).render('notfound');
    // console.log(res.statusCode + res);
});


