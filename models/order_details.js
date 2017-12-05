const mongoose = require('mongoose');

const schema = mongoose.Schema;

const order_det = schema({
    buyer_id:{
        type:String
    },
    seller_id:{
        type:String
    },
    gig_id:{
        type:String
    },
    seller_fname:{
        type:String
    },
    seller_lname:{
        type:String
    },
    buyer_fname:{
        type:String
    },
    buyer_lname:{
        type:String
    },
    total_ext_days:{
        type:String
    },
    selected_pac:{
        type:String
    },
    selected_price:{
        type:Number
    },
    assigned_days:{
        type:String
    },
    total_amount:{
        type:Number
    },
    resume:{
        type:String
    },
    description:{
        type:String
    },
    selected_extras:{
        type:String
    },
    date:{
        type:String
    }
});

const order = module.exports = mongoose.model("order",order_det);