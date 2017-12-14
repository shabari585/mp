const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const admin = require('../models/admin');
const User = require('../models/user');
const gig = require('../models/gig');
// const User = require('../models/user');
// const Order = require('../models/order');
const bcrypt = require('bcryptjs');


// post admin details
router.post("/admin_det",(req,res,next)=>{
    let newAdmin = new admin ({
        email:req.body.email,
        password:req.body.password
    }); 
    admin.addAdmin(newAdmin,(err,admin) => {
        if(admin){
            res.json({success:true,msg:admin});
        }else{
            res.json({success:false,msg:err});
        }
    })

})
// authenticate admin
router.post("/auth_admin",(req,res,next) => {
    // let email = "admin@admin.com";
    // let password = req.body.password;
    // admin.remove({email:email},(err,admin)=>{
    //     if(admin){
    //         res.json({success:true});
    //     }
    // })
    let email = req.body.email;
    let password = req.body.password;
    admin.find({email:email},(err,admin) => {
        if(err){
            res.json({success:false,msg:"No admin found"});
        }
        if(!admin){
            res.json({success:false,msg:"No admin found"});
        }
        if(admin){    
            console.log(admin);
               bcrypt.compare(password,admin[0].password,(err,isMatch) =>{
                if(err){
                    res.json({success:false,msg:"Password Incorrect"});
                }
                if(!isMatch){
                    res.json({success:false,msg:"Password Incorrect"});
                }
                if(isMatch){
                const token = jwt.sign( {data:admin} , config.secret, {expiresIn:604800});
                    res.json({success:true,
                            token:token,
                            msg:{
                                id:admin._id,
                                mail:admin.email,
                            }
                        });
                }
               })   
        }     
    });

});

// get all users
router.get("/get_all_users",(req,res,next) => {

        User.find((err,users) => {
            if(users){
                res.json({success:true,msg:users});
            }else{
                res.json({success:false,msg:err});
            }
        })
})
// get all gigs
router.get("/get_all_gigs",(req,res,next) => {
    gig.find((err,gigs) => {
        if(gigs){
            res.json({success:true,msg:gigs});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
module.exports = router;