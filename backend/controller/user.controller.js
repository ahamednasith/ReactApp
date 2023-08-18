const db = require('../models/index');
const { Sequelize,Op } = require('sequelize');
const dateTime = require('date-and-time');
const {encrypt,decrypt,generateToken} = require('../utils/cryptAndJwt');
const {removeOtp} = require('../utils/cron');
const { use } = require('../routes/user.router');
const Contact = db.contact;
const User = db.user;

const signUp = async (req, res) => {
    try {
        const phoneNumber = encrypt(String(req.body.phoneNumber));
        const otp = Math.floor(100000 + Math.random() * 900000);
        const currentTime = new Date();
        const count = await Contact.count({
            where: {
                phoneNumber,
                createdAt: {
                    [Op.gte]: new Date(currentTime.getTime() - 5 * 60000),
                },
            },
        });

        if (count >= 5) {
            return res.status(422).json({ message: "OTP Limit Has Reached. Try Again After 5 Minutes" });
        } else {
            const createdAt = new Date(currentTime.getTime());
            const expiredAt = new Date(currentTime.getTime() + 5 * 60000);
            const contact = await Contact.create({
                phoneNumber,
                otp,
                createdAt,
                expiredAt,
            });
            return res.json({message: "Success" });
        }
    } catch (error) {
        return res.json({ message: "Internal Server Error" });
    }
};

const verify = async (req, res) => {
    try {
        const phoneNumber = encrypt(String(req.body.phoneNumber));
        const otp = req.body.otp;
        const currentTime = new Date();
        const contact = await Contact.findOne({
            where: {
                phoneNumber,
                otp,
                expiredAt: {
                    [Op.gt]: currentTime,
                },
            },
        });

        if (!contact || currentTime > contact.expiredAt) {
            return res.status(422).json({ message: "OTP Has Expired" });
        } else {
            const userExists = await User.findOne({ where: { phoneNumber } });
            if (userExists) {
                return res.send({
                    profile:"true",
                    message: "Success",
                    data: {
                        userId: userExists.userId,
                        phoneNumber:decrypt(userExists.phoneNumber),
                        name: userExists.name,
                        age: userExists.age,
                        email: decrypt(userExists.email),
                    },
            });
            }
            else{
                return res.json({
                    message:"success",               
                })
            }
        }
    } catch (error) {
        return res.json({ message: "Internal Server Error" });
    }
};

const profile = async (req, res) => {
    try {
        const userId = Math.floor(10000000 + Math.random() * 90000000);
        const phoneNumber = encrypt(String(req.body.phoneNumber));
        const name = req.body.name;
        const age = req.body.age;
        const email = encrypt(String(req.body.email));
        const signUpDate = new Date();
        const loginDate = new Date();
        const userExists = await User.findOne({where:{phoneNumber}})
        if(userExists){
            const user = await User.update({
                name,age,email,loginDate
            },{where:{phoneNumber}})
            return res.json({ profile:true,message: "success", data:{ userId, phoneNumber:decrypt(phoneNumber),name,age,email:decrypt(email)} });
        }
        else{
            const user = await User.create({
                userId,
                phoneNumber,
                name,
                age,
                email,
                signUpDate,
                loginDate
            });
    
            return res.json({ profile:true,message: "success", data:{ userId, phoneNumber:decrypt(phoneNumber),name,age,email:decrypt(email)} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred. Please try again later.",error })
    }
};

module.exports = {signUp,verify,profile}