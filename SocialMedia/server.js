const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connection');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./routes/user');

const authRouter = require('./routes/auth');

const postRouter = require('./routes/posts');


dotenv.config({path:'./config/config.env'});

const app = express();
connectDB();

//middlewares

app.use(express.json())

app.use(helmet());
app.use(morgan('common'))


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.get('/',(req,res)=>{
    res.send("Filename")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})