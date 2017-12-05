const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = schema ({ 
    buyer_id:{
        type:String
    },
    buyer_fname:{
        type:String,
    },
    buyer_lname:{
        type:String,
    },
    date:{
        type:String,
    },
    seller_id:{
        type:String
    },
    gig_id:{
        type:String
    },
    score:{
        type:String
    },
    review:{
        type:String
    }
})

const review = module.exports = mongoose.model('review',reviewSchema);