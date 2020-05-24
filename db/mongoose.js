const mongoose=require('mongoose');
const {connectionURL,db} =require('../configurations/configuration');

mongoose.connect(`${connectionURL}/${db}`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true})

module.exports=mongoose;