const router = require('express').Router()
const { findById } = require('../models/Post');
const Post = require("../models/Post")
const User = require("../models/User")
//create a post

router.post("/",async(req,res)=>{
    console.log(req.body);
    const post = new Post(req.body);
    console.log(post);
    try{
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(200).json(err);
    }

})

//update a post



router.put("/:id",async(req,res)=>{

    const post = await Post.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("post updated successfully")
        }else{
            res.status(403).json("you can update your own post")
        }
    }catch(err){
        res.status(404).json("post not found");
    }



})


router.delete("/:id",async(req,res)=>{

    const post = await Post.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post deleted successfully")
        }else{
            res.status(403).json("you can update your own post")
        }
    }catch(err){
        res.status(404).json("post not found");
    }


})

router.put('/:id/like',async(req,res)=>{

    try{
        const post = await findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});  
            res.status(200).json("Post Liked Successfully")      
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Post Disliked Successfully")      

        }
    
    }catch(err){
        res.status(500).json(err);
    }

})




//delete a post

//like post

//get a post

router.get("/:id",async(req,res)=>{
    // const user = await User.findById(req.params.id);
    try{
        const allPostsofCurrentUser = Post.find({userId:req.params.id});
        res.status(200).json(allPostsofCurrentUser);
    }catch(err){
        res.status(500).json(err);
    }

})

//get timeline post


module.exports = router;