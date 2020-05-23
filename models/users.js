const mongoose=require('../db/mongoose.js');
const validator=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new error('name should be only aplhabets')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    }
 });

 userSchema.pre('save',async function(next) {
    const userModel=this;
    if(userModel.isModified("password")){
    userModel.password=await bcrypt.hash(userModel.password,8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email,password)=>{
    const userData=await userModel.findOne({email});
    if(!userData){
        throw new Error('username or password is invalid');
    }
    const isMatch=await bcrypt.compare(password,userData.password)
    if(!isMatch){
        throw new Error("username or password is invalid");   
    }
    return userData;
}

userSchema.methods.toJSON=function(){
    const userModal=this;
    const newResponse=userModal.toObject();
    delete newResponse.password;
    delete newResponse.__v;
    return newResponse
}



const userModel=mongoose.model('User',userSchema);//we can provide direct object also in place of userSchema but this is prefered

module.exports=userModel;
