const { Schema, model } = require('mongoose');



const ArticleSchema = Schema({


    date:{
        type:String,
        requied:true
    },
    category:{
        type:String,
        requied:true
    },
    title:{
        type:String,
        requied:true
    },
    description:{
        type:String,
        requied:true
    },
    body:{
        type:String,
        requied:true
    },
    image:{
        type:String,
        requied:true
    }

})

ArticleSchema.method('toJSON', function(){
    const { __v, date,  ...object } = this.toObject();
    // object.uid = _id
    return object;
});


module.exports = model( 'Article', ArticleSchema );