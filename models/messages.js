const mongoose = require('mongoose');
const schema = mongoose.Schema;

const inbox_schema = schema({
    conv_id:{
        type:String,
        required:true
    },
    sender_id:{
        type:String,
        required:true
    },
    to_id:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

const inbox = module.exports = mongoose.model('inbox',inbox_schema);