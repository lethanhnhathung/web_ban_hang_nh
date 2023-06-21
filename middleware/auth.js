const Users = require('../models/Users');
const db = require('../config/db/main');
const express = require('express');
const app = express();
app.use(express.json());
db.connect(); 
dotenv.config();

exports.auth = async (req,res,next) => {
    const user = await Users.findOne({ _id : req.body._id })
    .then(data => {
      return data
    })
    if( user )
    next();
    else{
      return res.status(400).json({
        message: "Chưa đăng nhập",
    });
    }
}

