const mongoose = require('mongoose');

//create model
const postSchema = new mongoose.Schema({
    //variables(attributes)
    topic : {
        type : String,   //data type
        required : true   //backend validation (have to put a value)
    },
    description : {
        type : String,
        required : true
    },
    postCategory : {
        type : String,
        required : true
    }
});

//module export to functions 
module.exports = mongoose.model('Posts',postSchema);