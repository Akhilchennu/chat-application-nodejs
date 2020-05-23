const mongoose=require('mongoose');

const connectionURL='mongodb+srv://akhie:sspmb143@cluster0-zn2vn.mongodb.net' 
const db='Chat'
mongoose.connect(`${connectionURL}/${db}`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true})

module.exports=mongoose;