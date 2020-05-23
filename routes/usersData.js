const express = require('express');
const userModel = require('../models/users');
const router = new express.Router();
const authenticationMiddleware=require('../middleware/authenticate');

const usersData=()=>{

    router.get('/users',authenticationMiddleware(),async (req,res)=>{
      try{
      const users=await userModel.find({_id:{$ne:req.user.userData["_id"]}})
      const usersList=users;
      res.send({success:true,users});
      }
      catch(error){
        res.status(500).send({success:false});
      }
    })

    return router;
}

module.exports = usersData;