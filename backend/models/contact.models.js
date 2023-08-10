module.exports = (sequelize,DataTypes) => {
    const Contact = sequelize.define('contact',{
        phoneNumber:{
            type: DataTypes.STRING
        },
        otp:{
            type: DataTypes.INTEGER
        },
        createdAt:{
            type: DataTypes.DATE
        },
        expiredAt:{
            type:DataTypes.DATE
        }
    },{
        timestamps:false
    });
    return Contact;
}