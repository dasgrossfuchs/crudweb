/* jshint esversion: 6*/

//////      Módulos y Controllers     //////
const express = require('express');
const path = require('path');
const expressSession = require('express-session');


const lOc = require('../controllers/logOut');
const putPrc = require('../controllers/putProduct');
const delPrc = require('../controllers/delProduct');
const regUserC = require('../controllers/storeuser');
const regUserV = require('../controllers/newuser');
const lIV = require('../controllers/login');
const lIC = require('../controllers/loginuser');


const authMW = require('../MiddleWare/authmw');
const reIfAuth = require('../MiddleWare/reIfAuth');


const router = express.Router();
module.exports = router;
router.use('/static', express.static('public'));

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


////// RENDERS Y RUTAS  //////

router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/user/register',reIfAuth,regUserV);
router.get('/user/login',reIfAuth,lIV);
router.get('/auth/logout',lOc);

router.get('/insertproduct',authMW,(req,res)=>{
    res.render('product');
});

router.post('/auth/register',reIfAuth,regUserC);
router.post('/auth/login',reIfAuth,lIC);

//////   CRUD   //////
const Product = require('../models/product');

//Creacion de registro
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

//Consulta general
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

//Consulta filtrada
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

//Update de registro
router.put('/api/product/:productId',authMW,putPrc);
//Delete de registro
router.delete('/api/product/:productId',authMW,delPrc);



//No se encontro
router.use((req,res)=>{
    res.status(404).render('notfound');
    // console.log(res.statusCode + res);
});


