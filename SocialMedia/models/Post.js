const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[]
    },
    image:{
        type:String,

    },
    desc:{
        type:String,
        max:500
    }

},
{timeStamps:true}
)
module.exports = mongoose.model("Post",PostSchema);