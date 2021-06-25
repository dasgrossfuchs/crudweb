/* jshint esversion: 6*/
const { response } = require("express");
const User = require("../models/user");
const path = require('path');
module.exports = (req,res)=>{
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.pass;
    user.save((error,savedusr)=>{
        if(error){
            return res.redirect('/user/register');
            // res.status(500).send({
            // message:`Error al guardar en la BD  ${error}`});
        }
        res.redirect('/');
    });

};