const express = require('express');
const router = new express.Router();
const authenticationMiddleware=require('../middleware/authenticate');

const authUser=()=>{
    router.get('/verifyauth',authenticationMiddleware(),(req,res)=>{
        res.send({
            success:req.isAuthenticated(),
            ...req.user
        });
    })
    return router;
}

module.exports=authUser