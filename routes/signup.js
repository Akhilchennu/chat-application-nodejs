const express = require('express');
const userModel=require('../models/users');
const router = new express.Router();

const signUp = () => {
   
    router.post('/signup',async (req,res)=>{
        try{
        const user=new userModel(req.body);
        await user.save();
        res.status(200).send({success:true});
        }
        catch(error){
         res.status(400).send({success:false,error:error});
        }
    })

    return router;
}

module.exports = signUp;