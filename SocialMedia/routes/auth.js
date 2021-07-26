const router = require('express').Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register
router
    .post("/register",async (req,res)=>{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const UserInstance = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        try{
            await UserInstance.save();
            res.status(200).json({
                success:true,
                successMessage:`User ${UserInstance.username} saved in db`
            })
        }catch(err){
            res.status(500).json({
                success:false,
                successMessage:`User ${UserInstance.username} can not be saved in db`
            })
        }    
        
    })

router
    .post('/login',async (req,res)=>{
    
        const UserInstance = await User.findOne({username:req.body.username});
        if(!UserInstance){
            res.status(404).json({
                success:false,
                successMessage:`User ${req.body.username} does not exist`
            })
        }else{
            const validPassword = await bcrypt.compare(req.body.password,UserInstance.password);
            if(!validPassword){
                res.status(500).json({
                    success:false,
                    successMessage:`User ${req.body.username} password wrong`
                })
            }
            res.status(200).json({
                success:true,
                successMessage:`User ${req.body.username} found in db`
            })
        }
        
})

router.get('/',(req,res)=>{
    res.send("FileName")
})

module.exports = router;