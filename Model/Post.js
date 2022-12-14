const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
   
     user:{
        type : Schema.Types.ObjectId,
        ref: 'user'
     },
     text : { 
         type: String,
         required: true
     },
     name: { 
         type: String,
         
     },
     avatar:{
          type:String,
     },
     likes:[
         {
          user:{
            type: Schema.Types.ObjectId,
            ref : 'user'
          },
         
        }
     ],
     comments:[
         {
            user:{
                type: Schema.Types.ObjectId,
                ref : 'user'
            },
              text : { 
                type: String,
                required: true
            },
            name: { 
                type: String,
                
            },
            avatar:{
                 type:String,
            }
         }
     ]
})

module.exports = post = mongoose.model('Post', postSchema);