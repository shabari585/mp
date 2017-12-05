const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// const User = require('../models/user');
// const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const jwtsimple = require("jwt-simple");

var moment = require('moment');
const multer = require('multer');
const parseFormdata = require('parse-formdata');
const Path = require('path');

var tokens;

const User = require('../models/user');
const User_en = require('../models/emailSubscription');
const User_delete = require('../models/deleteAccount');
const User_gig = require('../models/gig');
const favorites = require('../models/favorites');
const extras = require('../models/gig_extras');
const order = require('../models/order_details');
const review = require('../models/reviews');
const notification = require('../models/notifications');

 //multer disk storage
 const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb) => {
        cb(null,file.fieldname+Date.now()+Path.extname(file.originalname)); 
    }
})

var tokens;

//registration
router.post("/register",(req,res,next) => {
    var now = new Date();
   var date = moment();

    let newUser = new User({
        role:req.body.role,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        pay_pal:req.body.email,
        password:req.body.password, 
        profile_pic: "public/uploads/default.jpg",
        date:date
    });
    User.addUser(newUser,(err,user) => {
            if(err){
                res.json({success:false, msg:err});
            }else{
                // res.json({ success:true, msg:user});
                let newUser_en = new User_en({
                    user_id:user.id,
                    a : false,
                    b : false,
                    c : false,
                    d : false,
                    e : false,
                    f : false,
                    g : false,
                    h : false,
                    i : false,
                    j : false,
                })
                User_en.saveUser_en(newUser_en,(err,user) => {
                    if(err){
                        res.json({success:false,msg:err});
                    }else{
                        res.json({success:true,msg:user});
                    }
                });

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


// find user by email
router.get("/find-email/:email",(req,res,next) => {
    const email = req.params.email;
    User.getUserByEmail(email,(err,user) => {
        if(user){
            res.json({ success:true, msg:user});
        }else{
            res.json({ success:false, msg:err});
        }
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



// find user by id:
router.get("/user_details/:user_id",(req,res,next) => {
    user_id = req.params.user_id;

    User.getUserById(user_id,(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    }) 
})

const upload = multer({  
    storage : storage 
}).any("image"); 

//update user with address,country,city
router.post("/update_userdet",(req,res) => { 
   
                upload(req,res,(err) => { 
                        // imagePath = req.files[0].path;
                        let image = req.files;
                        user_id = req.body.user_id;
                        first_name = req.body.first_name;
                        last_name = req.body.last_name;
                        user_email = req.body.user_email;
                        user_skills = req.body.user_skills;
                        user_address = req.body.user_address;
                        user_city = req.body.user_city;
                        user_country = req.body.user_country;
                        user_description = req.body.user_description;
                        // console.log(first_name);
                        
                        if(image == null ||  image == ''){
                            image = '';
                        }else{
                            image = image[0].path;
                           
                            User.findOneAndUpdate({_id:user_id},{$set:{profile_pic:image}});
                        }
                           
                            User.findOneAndUpdate({_id:user_id},{$set:{first_name:first_name,
                                                                        last_name:last_name,
                                                                        email:user_email,
                                                                        skills:user_skills,
                                                                        address:user_address,
                                                                        city:user_city,
                                                                        country:user_country,
                                                                        description:user_description}}).exec((err,user) => {
                                                                            if(err){
                                                                                res.json({success:false,msg:err});
                                                                            }else{
                                                                                res.json({success:true,msg:user});
                                                                            }
                                                                        });                                      
                                                                    
                        }); 
                            
                           
        }); 
                                 
//update Email Notifications

router.post("/update_email_notification",(req,res,next) => {
 
        user_id = req.body.user_id;
        a = req.body.a;
        b = req.body.b;
        c = req.body.c;
        d = req.body.d;
        e = req.body.e;
        f = req.body.f;
        g = req.body.g;
        h = req.body.h;
        i = req.body.i;
        j = req.body.j;
  
        User_en.findOneAndUpdate({user_id:user_id},{$set:{a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h, i:i, j:j}}).exec((err,user) => {
            if(err){
                res.json({success:false, msg:err});
            }else{
                res.json({success:true,msg:user});
            }
        })
});


router.get("/get_email_notifications/:user_id",(req,res,next) => {
    
    user_id = req.params.user_id;

    User_en.find({user_id:user_id},(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    }); 
});

//delete User Account

router.post("/deleteUserAccount",(req,res,next) =>{
         user_id = req.body.user_id;
    let newUser_delete = new User_delete({
        user_id:req.body.user_id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        reason:req.body.UserReason
    })
        User_delete.addUser(newUser_delete,(err,user) =>{
            if(err){
                res.json({success:false, msg:err});
            }else{
                User.findOneAndRemove({_id:user_id},(err,msg) => {
                    if(err){
                        res.json({success:false,msg:err});
                    }else{
                        res.json({success:true, msg:"account deleted successfully"});
                    }
                });
            }
        })

        // user_id = req.body.user_id;
        
})

//authenticate Password

router.post("/authPassword",(req,res,next) =>{

    const user_id = req.body.user_id;
    const password = req.body.password;
    var newPassword = req.body.newPassword;

    // console.log(req.body);

        User.getUserById(user_id,(Iderr,user) => {
            if(Iderr){  
                res.json({success:false,msg:err});
            }else{
                // console.log(user.password);
                User.comparePassword(password,user.password,(err,isMatch) =>{
                    if(isMatch == true){
                        
                        bcrypt.genSalt(10,(err,salt) =>{
                            bcrypt.hash(newPassword,salt,(er,hash) => {
    
                                if(er){
                                    res.json({success:false,msg:er});
                                }else{
                                    newPassword = hash;
                                    // console.log(newPassword);
                                    User.findOneAndUpdate({_id:user_id},{$set:{password:newPassword}},(e,user) => {
                                        if(e){
                                            res.json({success:false,msg:e});
                                        }else{
                                            res.json({success:true,msg:user});
                                        }
                                    })
                                }
                            })
                        });
                    }else{
                        if(err){
                            res.json({success:false,msg:passerr});
                        }else{
                            res.json({success:false,msg:'Wrong Password'});
                        }
                    }
                    if(err){
                        // res.json({success:false,msg:passerr});
                        console.log('err');
                    }else{
                        // res.json({success:true,msg:user});
                        console.log(user);   
                        
                    
                   
                    }
                });
            }
        });
       
});

//update pay_pal

router.post("/update_paypal",(req,res,next) => {
    // console.log(req.body);
    pay_pal = req.body.pay_palEmail;
    user_id = req.body.user_id;

    User.findOneAndUpdate({_id:user_id},{$set:{pay_pal:pay_pal}}).exec((err,user) => {
        if(err){
            res.json({sucess:false,msg:err});
        }else{
            res.json({success:true,msg:user});
        }
    })

    
    
    
});

//upload gig details

router.post("/upload_gig_det",(req,res,next) => {

    upload(req,res,(err) => {
        console.log(req); 
    
           const data = req.body;
           const pic1 = req.files[0].path;
           const pic2 = req.files[1].path;
           const pic3 = req.files[2].path; 
            // console.log(pic1);
        let new_gig = new User_gig({
            user_id:data.user_id,
            first_name:data.first_name,
            last_name:data.last_name,
            category:data.category,
            title:data.title, 
            description:data.description,
            email:data.email,
            profiles:data.profiles,
            sharing:data.sharing,
            social_login:data.social_login,
            rating:data.rating,
            mobile:data.mobile,
            pac_cos_sta:data.pac_cos_sta,
            pac_cos_pre:data.pac_cos_pre,
            pac_cos_pro:data.pac_cos_pro,
            pac_det_sta:data.pac_det_sta,
            pac_det_pre:data.pac_det_pre,
            pac_det_pro:data.pac_det_pro,
            pac_del_sta:data.pac_del_sta,
            pac_del_pre:data.pac_del_pre,
            pac_del_pro:data.pac_del_pro,
            rev_sta:data.rev_sta,
            rev_pre:data.rev_pre,
            rev_pro:data.rev_pro,
            words_sta:data.words_sta,
            words_pre:data.words_pre,
            words_pro:data.words_pro,
            sf_sta:data.sf_sta,
            sf_pre:data.sf_pre,
            sf_pro:data.sf_pro,
            hq_sta:data.hq_sta,
            hq_pre:data.hq_pre,
            hq_pro:data.hq_pro,           
            que1:data.que1,
            ans1:data.ans1,
            img1:pic1,
            img2:pic2,
            img3:pic3
           })

           new_gig.save((err,gig) =>{
               if(gig){ 
                   res.json({success:true,msg:gig});
               }else{
                res.json({success:false,msg:err});
               }    
           });  
       });
    });
    
//post gig etras

router.post("/post_gig_extrs",(req,res,next) => {
    console.log(req.body);

    const gig_id = req.body.gig_id;
    const ext = req.body.extrs;
    console.log(ext);
    for (var i = 0; i < ext.length; i++) {
        var element = ext[i];
        
        let newextras = new extras({
            gig_id:gig_id,
            e_description:element.description,
            price:element.cost,
            days:element.days
            // gig_id:"5a169f3f9f9b290368e0c082",
            // e_description:"cuscsfgx",
            //  price:"55",
            //  days:"25"
          
        }) 
         newextras.save((err,extras) => {        
        })
    }                           
     res.json({success:true,msg:extras});                        
}) 

// update gig
router.post("/update_gig",(req,res,next)=>{
   upload(req,res,(err)=>{
    //    console.log(req.body);
       let gig_id = req.body.gig_id;
       const data = req.body;
       const pic1 = req.files[0].path; 
       const pic2 = req.files[1].path;
       const pic3 = req.files[2].path;
       User_gig.findByIdAndUpdate({_id:gig_id},{$set:{
                                                        user_id:data.user_id,
                                                        first_name:data.first_name,
                                                        last_name:data.last_name,
                                                        category:data.category,
                                                        title:data.title, 
                                                        description:data.description,
                                                        email:data.email,
                                                        profiles:data.profiles,
                                                        sharing:data.sharing,
                                                        social_login:data.social_login,
                                                        rating:data.rating,
                                                        mobile:data.mobile,
                                                        pac_cos_sta:data.pac_cos_sta,
                                                        pac_cos_pre:data.pac_cos_pre,
                                                        pac_cos_pro:data.pac_cos_pro,
                                                        pac_det_sta:data.pac_det_sta,
                                                        pac_det_pre:data.pac_det_pre,
                                                        pac_det_pro:data.pac_det_pro,
                                                        pac_del_sta:data.pac_del_sta,
                                                        pac_del_pre:data.pac_del_pre,
                                                        pac_del_pro:data.pac_del_pro,
                                                        rev_sta:data.rev_sta,
                                                        rev_pre:data.rev_pre,
                                                        rev_pro:data.rev_pro,
                                                        words_sta:data.words_sta,
                                                        words_pre:data.words_pre,
                                                        words_pro:data.words_pro,
                                                        sf_sta:data.sf_sta,
                                                        sf_pre:data.sf_pre,
                                                        sf_pro:data.sf_pro,
                                                        hq_sta:data.hq_sta,
                                                        hq_pre:data.hq_pre,
                                                        hq_pro:data.hq_pro,           
                                                        que1:data.que1,
                                                        ans1:data.ans1,
                                                        img1:pic1,
                                                        img2:pic2,
                                                        img3:pic3
       }},(err,gig) => {
           if(gig){
               res.json({success:true,msg:gig});
           }else{ 
               res.json({success:false,msg:err});
           }
       })  
   })   
})

// update gig extras
router.post("/update_gig_extrs",(req,res,next) => {
    let gig_id = req.body.gig_id; 
    const ext = req.body.extrs;   
            // console.log(ext);
        extras.remove({gig_id:gig_id},(err,del) => {
            if(del){  
                    ext.forEach(element => {
                        let newextras = new extras({
                            gig_id:gig_id,
                            e_description:element.description, 
                            price:element.cost,
                            days:element.days
                        })
                        newextras.save((err,ext) => {
                        }) 
                    });                                                            
                    res.json({success:true,msg:"extras updated successfully"});
                }
        })
            

                     
                
   })
                    
//Getting gig details
router.get("/get_gig_det/:id",(req,res,next) => {
    const gig_id = req.params.id;
    // console.log(gig_id);
    User_gig.findById({_id:gig_id},(err,gig) => {
        if(gig){
            // console.log(gig.length);
                res.json({success:true,msg:gig});
        }else{ 
            res.json({success:false,msg:err});  
        }
    })
});


//get all gigs

router.get("/get_all_gigs",(req,res,next) => {
    User_gig.find((err,user) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:user});
            // console.log(user);
        }
    })
});

// get gigsby user_id
router.get("/get_gigsby_id/:user_id",(req,res,next) => {
    const user_id = req.params.user_id;
    User_gig.find({user_id:user_id},(err,user_gigs) => {
        if(user_gigs){
            res.json({success:true,msg:user_gigs});
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// get gig by gig_id

router.get("/get_gig_byId/:gig_id",(req,res,next) => {
    let gig_id = req.params.gig_id;
    // console.log(gig_id);
    User_gig.findById({_id:gig_id},(err,gig) =>{
        if(gig){
            res.json({success:true,msg:gig});
            // console.log(gig);
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// gig_by_cat

router.get("/gig_cat/:category/:user_id",(req,res,next) => {
    const cat = req.params.category;
    const user_id = req.params.user_id;
    User_gig.find({user_id:user_id,category:cat},(err,user) => {
        if(user){
            // if(user.msg[].length<0){
            //     res.json({success:false,msg:"no data but user success"});
            // }else{
                res.json({success:true,msg:user});
            // }
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// delete gig
router.get("/delete_gig/:gig_id",(req,res,next)=>{
    let gig_id = req.params.gig_id;
        User_gig.remove({_id:gig_id},(err,success) => {
            if(success){
                res.json({success:true,msg:"Gig deleted successfully"});
            }else{
                res.json({success:false,msg:err});
            }
        })
})

// add gig to favorite

router.post("/add_to_fav",(req,res,next) => {

    const gig_id = req.body.gig_id;
    const user_id = req.body.user_id;

    favorites.find({gig_id:gig_id,user_id:user_id},(err,fav_gig) => {
        if(fav_gig){ 
            console.log(fav_gig);
            if(fav_gig.length > 0){
                favorites.remove({gig_id:gig_id},(er,success) => {
                    if(success){
                        res.json({success:true,msg:"removed from favorites"});
                    }
                })
            }else{
                let newFav = new favorites({
                    user_id:user_id,
                    gig_id:gig_id
                })
               
                newFav.save((e,saved_fav) => {
                    if(saved_fav){
                        res.json({success:true,msg:"added to favorites"});
                        
                    }else{
                        res.json({success:false,msg:e});
                    }
                })
            }
        }else{
            if(err){
                res.json({success:false,msg:err});
            }else{
                res.json({success:false,msg:"something wrong"});
            }

        }
    })
})

// get_favorites

router.get("/get_fav/:user_id",(req,res) => {

    uid = req.params.user_id;
    console.log(uid);

    favorites.find({user_id: uid},(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get fav gig
router.get("/get_fav_gig/:gig_id/:user_id",(req,res) => {
    const gig_id = req.params.gig_id;
    const user_id = req.params.user_id;
    console.log(gig_id,user_id);
    favorites.find({gig_id:gig_id,user_id:user_id},(err,gig) => {
        if(gig){
            if(gig.length == 0){
                res.json({success:false, msg: 'No gig'});
            }else{
                res.json({success:true,msg:gig});
            }
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get gig extrs

router.get("/get_gig_extrs/:gig_id",(req,res,next) => {

    const gig_id = req.params.gig_id;
  
    extras.find({gig_id:gig_id},(err,extrs) => {
        if(extrs){
            if(extrs){
                res.json({success:true,msg:extrs});
                console.log(extrs);
            }
        }else{
            res.json({success:false,msg:err});
        }
    })
})

router.get("/get_extrs",(req,res,next) => {     
        extras.find((err,extrs) => {
            if(extrs){
                if(extrs){
                    res.json({success:true,msg:extrs});
                }
            }else{
                res.json({success:false,msg:err});
            }
        })
    })

// remove all gigs
// router.post("/remove",(req,res) =>{
//     User_gig.remove((err,user)=> {
//         if(user)
//         res.json({success:true});
//     })
// })

// post order details

router.post("/post_order_det",(req,res,next) => {
    var now = new Date();
    var date = moment();
    
    upload(req,res,(err) => {
        console.log(req);
        let or = req.body;
        let resume = req.files[0];
        let newOrder = new order({
            seller_id:or.seller_id,
            buyer_id:or.buyer_id,
            gig_id:or.gig_id,
            seller_fname:or.seller_fname,
            seller_lname:or.seller_lname,
            buyer_fname:or.buyer_fname,
            buyer_lname:or.buyer_lname,
            selected_pac:or.selected_pac,
            selected_price:or.selected_price,
            assigned_days:or.assigned_days,
            total_ext_days:or.total_ext_days,
            total_amount:or.total_amount,
            selected_extras:or.extras, 
            resume:resume.path,
            description:or.order_description,
            date:date
        })
        console.log(newOrder);
            newOrder.save((err,order)=> {
                if(order){
                    res.json({success:true,msg:order});                    
                }else{
                    res.json({success:false,msg:"order not placed"});
                }
            })

    })
})

// get order details(seller)
router.get("/get_seller_order_det/:seller_id",(req,res,next) => {
    const user_id = req.params.seller_id;
    order.find({seller_id:user_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get order details(buyer)
router.get("/get_buyer_order_det/:buyer_id",(req,res,next) => {
    const user_id = req.params.buyer_id;
    order.find({buyer_id:user_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get orderby order_id
router.get("/get_orderby_id/:order_id",(req,res,next) => {
    const order_id = req.params.order_id;
    order.find({_id:order_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// post review

router.post("/post_review",(req,res,next) => {
    
    // console.log(req.body);
    var date = moment();
    let newReview = new review({
            buyer_id:req.body.buyer_id,
            seller_id:req.body.seller_id,
            gig_id:req.body.gig_id,
            score:req.body.score,
            review:req.body.review,
            date:date,
            buyer_fname:req.body.buyer_fname,
            buyer_lname:req.body.buyer_lname
    });
    newReview.save((err,review) => {
        if(review){
            res.json({success:true,msg:review});
            // console.log(review);
        }else{
            res.json({success:false,msg:err});
        }
    })
})
 
// get reviews
router.get("/get_reviews/:user_id",(req,res,next) => {
    const user_id = req.params.user_id;
    review.find({seller_id:user_id},(err,rev) => { 
        if(rev){
            res.json({success:true,msg:rev});
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// post new notification
router.post("/post_not",(req,res,next) => {
    // console.log(req.body);
    const not = req.body;
    let new_not = new notification({
        user_id:not.user_id,
        message:not.message,
        date:not.date,
        status:not.status,
        image:not.image,
        link:not.link
    })
    // console.log(new_not);
    new_not.save((err,not) => {
        if(not){
            res.json({success:true,msg:not});
            // console.log(not);
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get notifications
router.get("/get_notby_id/:user_id",(req,res,next)=>{
    const user_id = req.params.user_id;
    notification.find({user_id:user_id},(err,not) => {
        if(not){
            res.json({success:true,msg:not})
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// change notification status
router.post("/change_not_status",(req,res,next) => {
    const not_id = req.body.not_id;
    // console.log(not_id);
    notification.findOneAndUpdate({_id:not_id},{$set:{status:"seen"}}).exec((err,not) => {
        if(not){
            res.json({success:true,msg:not});
        }else{
            res.json({success:false,msg:err});
        }
    });
})

// mark all read
router.post("/mark_all_read",(req,res,next) => {
    const user_id = req.body.user_id;
    notification.update({user_id:user_id},{$set:{status:"seen"}}).exec((err,not) => {
        if(not){
            res.json({success:true,msg:not});
        }else{
            res.json({success:false,msg:err});
        }
    });
})
module.exports = router; 