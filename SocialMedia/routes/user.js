const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");



router.get('/',(req,res)=>{
    res.send("FileName")


})

// get a user
//delete user
//follow a user
// update user
//unfollow a user

router.put('/:id', async(req,res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json("Account has been updated");

        }catch(err){
            res.status(500).json(err);

        }
    }else{
        return res.status(403).json("Yo can update only your account");
    }

})


router.delete('/:id',async (req,res)=>{
    
    // console.log(req.body.userId,req.params.id);
    console.log("hello Wordl");


    if(req.body.userId === req.params.id){
        try{
            await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("user Deleted Successfully");
        }catch(err){
            res.status(500).json(err);

        }
    }else{
        res.status(403).json("you can delete only your account");
    }

})

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt,...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json("No user has been found");
    }
})

router.put("/:id/follow",async(req,res)=>{
    if(req.params.id !== req.body.id){

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.id);

            if(!user.followers.includes(currentUser)){
                await user.updateOne({$push : {followers :req.body.userId}}); // for unfollow it ill be pull instead of push
                await currentUser.updateOne({$push : {followings : user._id}})
                res.status(200).json()
            }else{
                res.status(403).json("you already follow this user")
            }
            
        } catch (error) {
            
        }

    }else{
        res.status(403).json("you can not follow yourself")
    }
})

module.exports = router;