const Joi = require('joi');

const schema = Joi.object({
    userId:Joi.number().min(10000000).max(99999999),
    phoneNumber:Joi.number().min(1000000000).max(9999999999).required(),
    otp:Joi.number().min(100000).max(999999),
    name:Joi.string().min(2).max(40),
    age:Joi.number().min(15).max(70),
    email:Joi.string().email({minDomainSegments:1,tlds:['com']}).regex(/pepul\.com/),
})
const phoneValidate =(req,res,next) =>{
    const phoneNumber = req.body.phoneNumber;
    const {error} = schema.validate({phoneNumber});
    if(error){
        return res.status(401).json({statuscode:401,error:error.message});
    }
    next();
}

const otpSchema = Joi.object({
    otp:Joi.number().min(100000).max(999999)
})
const contactValidate = (req,res,next) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const {error} = otpSchema.validate({otp});
    if(error){
        return res.status(401).json({statuscode:401,error:error.message});
    }
    next();
}

const userValidate = (req,res,next) => {
    const userId =  Math.floor(10000000 + Math.random() * 90000000);
    const phoneNumber = req.body.phoneNumber;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const {error} = schema.validate({userId,phoneNumber,name,age,email});
    if(error){
        return res.status(401).json({statuscode:401,error:error.message});
    }
    next();
}

module.exports = {phoneValidate,contactValidate,userValidate};