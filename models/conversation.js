const mongoose = require('mongoose');
const schema = mongoose.Schema;

const conversation_schema = schema({
    conv_id:{
        type:String,
        required:true
    },
    user1:{
        type:String,
        required:true
    },
    user2:{
        type:String,
        reuired:true
    }
});

const conversation = module.exports = mongoose.model('conversation', conversation_schema);