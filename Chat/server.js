const express = require('express');
const cors = require('cors');



const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http)

app.use(cors());
app.use(express.static(__dirname))

app.use(express.json())

var messages = [
    {name:'John',message:"Hello "},
    {name:'Jane',message:"Hi"},
] 



app.get('/messages',(req,res)=>{

    res.send(JSON.stringify(messages))

})
app.post('/messages',(req,res)=>{

    messages.push(req.body);
    
    io.emit('message',req.body)

    res.status(200).json({
      messages  
    })


})

io.on('connection',(socket)=>{
    console.log("User Connected");
})


const server = http.listen(3000,()=>{
    console.log("Server is runnig on port 3000");
});

