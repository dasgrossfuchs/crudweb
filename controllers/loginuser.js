/* jshint esversion: 6*/
const { response } = require("express");
const User = require("../models/user");
const path = require('path');
const bcrypt = require('bcrypt');
module.exports = (req,res)=>{
    const {username,pass} = req.body;
    User.findOne({username:username},(error,user)=>{
        if(user){
            bcrypt.compare(pass,user.password,(error,same)=>{
                if(same){
                    res.redirect('/');
                }
                else{
                    res.redirect('/user/login');
                }
            });
        }
        else{
            res.redirect('/user/login');
        }
    });
};