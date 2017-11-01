const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
// const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const jwtsimple = require("jwt-simple");

var tokens;
//registration
router.post("/register",(req,res,next) => {
    let newUser = new User({
        role:req.body.role,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password
    });
    User.addUser(newUser,(err,user) => {
            if(err){
                res.json({successs:false, msg:'user failed to register'});
            }else{
                res.json({ success:true, msg:user});
            }
    });
});

//authenticate
router.post("/authenticate",(req,res,next) => {
   const email = req.body.email;
    const password = req.body.password;

        User.getUserByEmail(email,(err,user) => {
            if(err){
                throw err;
            }if(!user){
                res.json({ success:false , msg:'user not found'});
            }
            User.comparePassword(password,user.password,(err,isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign( {data:user} , config.secret, {expiresIn:604800});//expires in week
                    res.json({
                        success : true,
                        token : token,
                        user:{
                            id:user._id,
                            first_name:user.first_name,
                            last_name:user.last_name,
                            email:user.email
                        }
                    });
                }else{
                    res.json({ success:false , msg:'wrong password'});
                }
            });
        });
});

//forget password
router.post("/forget-password",(req,res,next) => {
    const email = req.body.email;

    User.getUserByEmail(email,(err,user) => {
       
        // if(!user){
        //     res.json({ success:false, msg:"user not found"});}
        if(user){
        
         const token = jwtsimple.encode( {"user":"password"} ,'kbv@asteriisc.com');
        //  timestap
        tokens=token;
    
        res.send(tokens);
        }else{
            res.json({success:false, msg:err});
        }
    })
})

//OTP
router.post("/otp",(req,res,next) => {
    const otp = req.body.otp;
    res.send(tokens);
    // const otpPassword = jwtsimple.decode(otp,'kbv@asteriisc.com');
        // res.send(otpPassword);
    // res.send(tokens[0]);
    // if(otp == tokens){

    //     res.json({ success:true,msg:"token matched"});
    //     }
     })

module.exports = router;