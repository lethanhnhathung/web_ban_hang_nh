const Users = require('../../models/Users');
const db = require('../../config/db/main');
db.connect();

// Lấy thông tin người dùng có email và role giống như trong req
exports.getByInformation = async (data) => {
    return Users.findOne({
        account : data.account
    });
}

exports.createAccount = async (data) => {
    const newUser = await Users.create({
        name: data.name,
        address: data.address,
        account: data.account,
        password: data.password,
        phone: data.phone
    })
    .then((createdUser) => {
        return createdUser;
      }).catch((err) => {
        console.log(err);
        return {};
      });

    return newUser;
}

exports.checkAccount = async (account) => {
    const User = await Users.findOne({
        account: account
    })
    .then((User) => {
        if( User == null ){
            return false
        }
        else{
            return true
        }
      }).catch((err) => {
        console.log(err);
        return {};
      });

    return User;
}