// npm install express express-handlebars mongoose
// npm install nodemon --save-dev
'use strict';
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const app = express();
const router = require('./routes/router');//router out app
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',router); // se direcciona con router



//recursos estáticos/ públicos
app.use('/static', express.static('public'));

//motor de vistas
app.engine('.hbs',hbs({
    defaultLayout : 'index',
    extname : '.hbs'
}));

app.set('view engine', '.hbs');

mongoose.connect(config.db, config.urlParser, (err,res)=>{
    if(err){
        console.log(`Error al conectar en la BD ${err}`);
    }
    else  {
        console.log('Conexión a la BD exitosa');
        app.listen(config.port, ()=>{
            console.log(`Ejecutando en http://localhost:${config.port}`);
        });
    }
});
//Agustin Valdés Fuchs