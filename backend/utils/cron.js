const cron = require('node-cron');
const {Op} = require('sequelize');
const db = require('../models/index');
const Contact = db.contact;

const removeOtp = async () => {
    const currentTime = new Date();
    await Contact.destroy({
        where:{
            expiredAt:{
                [Op.lte]:currentTime
            }
        }
    });
};

cron.schedule("*/5 * * * *",removeOtp);

module.exports = { removeOtp };