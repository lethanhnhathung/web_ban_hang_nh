const AuthService = require('./auth.service');
const db = require('../../config/db/main');
const express = require('express');
const app = express();
const Users = require('../../models/Users');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const fs = require('fs');
app.use(express.json());
db.connect();

//[Post]/login
exports.login = async (req, res) => {
    try{
      //Lấy dữ liệu từ body
      const data = req.body;

      let user = await AuthService.getByInformation(data);

      //Nếu tài khoản không tồn tại thì trả về thất bại luôn
        if ( user  === null ){
            return res.status(400).json({
                success: false,
                message: "Đăng nhập thất bại",
                content: "Tài khoản không tồn tại"
            });
        }
      
      // Kiểm tra mật khẩu đối chiếu mật khẩu trong req và database
        if (data.password === user.password) {
        // Nếu xác thực đăng nhập thành công, trả lại res 200 và token, thông tin dùng để đăng nhập
        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            content: { id:user.id , account: user.account}
        });
        } 
        else 
        {
            return res.status(400).json({
                success: false,
                message:"Đăng nhập thất bại",
                content: "Mật khẩu không chính xác"
            });
        }
    
    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Đăng nhập thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.isAuthenticated = async (req, res) => {
    try{
        localStorage.setItem('isAuthenticated', 'true');
        let user = await AuthService.getByInformation(req.body);
        localStorage.setItem("user", JSON.stringify(user));
        res.status(200).json({
            success: true,
            message: "Thay đổi trạng thái thành công",
            content: ""
        });
    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Thay đổi trạng thái thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.logout = async (req, res) => {
    try{
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('user', JSON.stringify(''));
        res.status(200).json({
            success: true,
            message: "Thay đổi trạng thái thành công",
            content: ""
        });
    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Thay đổi trạng thái thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.signup = async (req, res) => {
    try{
        const data = req.body;

        const exist = await AuthService.checkAccount(data.account);
        if(exist == true)
        {
            res.status(400).json({
                success: false,
                message: "Tài khoản đã tồn tại",
                content: ""
            });
        }
        else{
            const newUser = await AuthService.createAccount(data);
            fs.mkdirSync(`./public/image/product/${data.account}`)
            res.status(200).json({
                success: true,
                message: "Tạo tài khoản thành công",
                content: newUser
            });
        }

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Tạo tài khoản thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.getuser = async (req, res) => {
    try{
        const user = JSON.parse(localStorage.getItem('user'));

        res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            content: user
        });

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Lấy thông tin thất bại",
        content: "Lỗi không xác định"
        });
    }
}



