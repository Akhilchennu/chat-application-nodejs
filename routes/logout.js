const express = require('express');
const router = new express.Router();

const logoutUser=()=>{
    router.get('/logout',(req,res)=>{
        req.logout();
        res.send({success:true});
    })
    return router;
}

module.exports=logoutUser;