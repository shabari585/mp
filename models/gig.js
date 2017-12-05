const mongoose = require('mongoose');

const schema = mongoose.Schema;

const gigSchema = new schema({
    user_id:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email: {
        type:Boolean,
        required:true
    },
    profiles: {
        type:Boolean,
        required:true
    },
    sharing: {
        type:Boolean,
        required:true
    },
    social_login: {
        type:Boolean,
        required:true
    },
    rating: {
        type:Boolean,
        required:true
    },
    mobile:{
        type:Boolean,
        required:true
    },
    pac_cos_sta: {
        type:String,
        required:true
    },
    pac_cos_pre:{
        type:String,
        required:true
    },
    pac_cos_pro:{
        type:String,
        required:true
    },
    pac_det_sta: {
        type:String,
        required:true
    },
    pac_det_pre: {
        type:String,
        required:true
    },
    pac_det_pro:{
        type:String,
        required:true
    },
    pac_del_sta: {
        type:String,
        required:true
    },
    pac_del_pre: {
        type:String,
        required:true
    },
    pac_del_pro: {
        type:String,
        required:true
    },
    rev_sta:{
        type:String,
        required:true
    },
    rev_pre: {
        type:String,
        required:true
    },
    rev_pro: {
        type:String,
        required:true
    },
    words_sta:{
        type:String,
        required:true
    }, 
    words_pre:{
        type:String,
        required:true
    },
    words_pro: {
        type:String,
        required:true
    },
    sf_sta: {
        type:Boolean,
        required:true
    },
    sf_pre:{
        type:Boolean,
        
        required:true
    },
    sf_pro: {
        type:Boolean,
        required:true
    },
    hq_sta: {
        type:Boolean,
        required:true
    },
    hq_pre: {
        type:Boolean,
        required:true
    },
    hq_pro: {
        type:Boolean,
        required:true
    },
    que1:{
        type:String,
        required:true
    },
    ans1: {
        type:String,
        required:true
    },
    img1:{
        type:String,
        required:true
    },
    img2:{
        type:String,
        required:true
    },
    img3:{
        type:String,
        required:true
    }
})

const User_gig = module.exports = mongoose.model('User_gig',gigSchema);