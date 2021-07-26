const mongoose = require('mongoose');

const connectDB = ()=>{


    mongoose.connect(`mongodb://localhost:27017/socialMedia`,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    .then(() => console.log("Connection to DB successful"))
    .catch((err) => console.error(err, "Error"));
    
}
module.exports = connectDB;