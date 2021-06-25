/* jshint esversion: 6*/
const { response } = require("express");
const User = require("../models/user");
const path = require('path');
module.exports = (req,res)=>{
    res.render('login');
};