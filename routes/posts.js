const express = require('express');
const Posts = require("../models/posts");  //import model

const router = express.Router(); //to write http requests


//add posts(Create)
router.route('/add').post((req,res) =>{
    
  //properties
   const topic = req.body.topic;  // to model initiate
   const description = req.body.description; 
   const postCategory = req.body.postCategory; 
   
   const newPost = new Posts({
       topic,
       description,
       postCategory
   })
   //send js object to database
   newPost.save().then(()=>{
        //if success
        res.json("Post Added Successfully");
   }).catch((err)=>{
      console.log(err);//display error

   });
});


//get posts(Read)
router.route('/').get((req,res) =>{
    Posts.find().then((posts)=>{
          res.json(posts);  //if successs display all posts
    }).catch((err) =>{
        console.log(err);
    });
});


//update posts(Update) using id

router.route('/update/:id').put(async (req,res)=>{
    let userId = req.params.id;  //fetch user id
    const {topic,description,postCategory} = req.body;  //destructure

    const updatePost = {
        topic,
        description,
        postCategory
    }

    //check this id user available or not
    const update = await Posts.findByIdAndUpdate(userId,updatePost)
    //send response to frontend for updated
    .then(()=>{
      res.status(200).send({status:"Post Updated Successfully!!!"}) //updated success
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status:"Error with Updating post",error:err.message})
    })
  
})


//delete posts(Delete) using id

router.route("/delete/:id").delete(async(req,res) =>{
   let userId = req.params.id;
   
   await Posts.findByIdAndDelete(userId)
   .then(()=>{
     res.status(200).send({status:"Post Deleted Successfully!!!"}) //delete success
   }).catch((err) =>{
      console.log(err.message);
      res.status(500).send({status:"Error with delete post ",error:err.message});
   })
})

//get data of one user
router.route("/get/:id").get((req,res)=>{
    let postId = req.params.id;
    
    Posts.findById(postId)
    .then((posts) => {
       res.json(posts)
    }).catch((err)=>{
        console.log(err.message);
    })
})

//export the module
module.exports = router;