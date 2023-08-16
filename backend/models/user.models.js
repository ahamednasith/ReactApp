module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',{
        userId:{
            type: DataTypes.INTEGER
        },
        phoneNumber:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        age:{
            type: DataTypes.INTEGER
        },
        email:{
            type: DataTypes.STRING
        },
        signUpDate:{
            type: DataTypes.DATE
        },
        loginDate:{
            type:DataTypes.DATE
        }
    },{
        timestamps:false
    });
    return User;
}