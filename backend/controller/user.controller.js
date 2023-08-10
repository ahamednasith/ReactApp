const db = require('../models/index');
const { Sequelize,Op } = require('sequelize');
const dateTime = require('date-and-time');
const {encrypt,decrypt,generateToken} = require('../utils/cryptAndJwt');
const Contact = db.contact;
const User = db.user;

const signUp = async  (req,res) => {
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const otp = Math.floor(100000 + Math.random() * 900000);
    const currentTime = new Date();
    const count = await Contact.count({
        where:{
            phoneNumber,
            createdAt:{
                [Op.gte]:new Date(currentTime.getTime() - 5 * 60000)
            }
        }
    });
    if(count >= 5){
        return res.status(422).json({statuscode:422,message:"OTP Limit Has Reached.Try Again After 5 Minutes"});
    } else {
        const createdAt = new Date(currentTime.getTime());
        const expiredAt = new Date(currentTime.getTime() + 5 * 60000);
        const contact = await Contact.create({
            phoneNumber,otp,createdAt,expiredAt
        });
        return res.status(200).json({statuscode:200,message:"OTP Generated"});
    }
};

const verify = async (req,res) => {
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const otp = req.body.otp;
    const currentTime = new Date();
    const contact = await Contact.findOne({
        where:{
            //phoneNumber,
            otp,
            expiredAt:{
                [Op.gt]:currentTime
            }
        }
    });
    console.log(contact)
    if(!contact || currentTime > contact.expiredAt){
        return res.status(422).json({statuscode:422,message:"OTP Has Expired"});
    }
    return res.status(200).json({statuscode:200,message:"OTP Verified Succesfully"});
}

const profile = async (req,res) => {
    const userId = Math.floor(10000000 + Math.random() * 90000000);
    const phoneNumber = encrypt(String(req.body.phoneNumber));
    const name = req.body.name;
    const age = req.body.age;
    const email = encrypt(String(req.body.email));
    const signUpDate = new Date();
    const loginDate = dateTime.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    const numberExists = await User.findOne({where:{phoneNumber}});
    if(numberExists){
        const user = await User.update({
            userId,
            loginDate
        },{
            where:{phoneNumber}
        });
    } else {
        const user = await User.create({
            phoneNumber:phoneNumber,
            userId,
            name,
            age,
            email,
            signUpDate,
            loginDate
        });
    }
    const token = generateToken(userId,loginDate);
    return res.status(200).json({
        statuscode:200,
        message:"User Details Uploaded Successfully",accesstoken:token});
}



module.exports = {signUp,verify,profile};