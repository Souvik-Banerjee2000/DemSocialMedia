const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());



const users = [
    {
        id:"1",
        username:"john@2",
        password : "john#223",
        isAdmin:true
    },
    {
        id:"2",
        username:"janen@2",
        password : "jane#223",
        isAdmin:false
    }
]


app.post("/api/login",(req,res)=>{
    const {username,password} = req.body;

    const user = users.find(u => {
        return u.username === username && u.password === password;
    })
    if(user){
        // res.json(user);

        const accessToken = jwt.sign({id:user.id,isAdmin:user.isAdmin},"mySecretKey",{expiresIn:"15m"});
        res.json({
            username:user.username,
            isAdmin:user.isAdmin,
            accessToken
        })



    }else{
        res.status(400).json("Username or password invalid");
    }
})


const verify = (req,res,next) =>{

    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify( token, "mySecretKey" , (err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }else{
                req.user = user;
                next();
            }
        } )

    }else{
        res.json(401).json("You are not authenticated")
    }
}

app.delete("/api/users/:userId",verify,(req,res)=>{

    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("User deleted successfully");
    }else{
        res.status(403).json("You are not allowed to delete this acc");
    }

})


app.listen(5000,()=>console.log(`Application running at ${5000}`))