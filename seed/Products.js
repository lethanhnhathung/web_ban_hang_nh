const mongoose = require('mongoose');
const Products = require('../models/Products');
// Tự connect tới database
mongoose.connect('mongodb://localhost:27017/web_ban_hang_tdk', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
// Xóa toàn bộ dữ liệu
Products.deleteMany()
        .then(data=>{
          console.log("Products seed cleared");
        })
        .catch(err=>{
          console.log(err);
        })
//Tạo dữ liệu mới


Products.create({
    name: "gạo tám thơm",
    image: "",
    price: 100000,
    unit: "cân",
    address: "Thanh Oai, Hà Nội",
    status:"Đang bán",
    users:""
},{
    name: "gà chân to",
    image: "",
    price: 150000,
    unit: "con",
    address: "Hoàn Kiếm, Hà Nội",
    status:"Đang bán",
    users:""
},{
    name: "gà đông tảo",
    image: "",
    price: 200000,
    unit: "con",
    address: "Hà Đông, Hà Nội",
    status:"Đang bán",
    users:""
},{
    name: "gạo tám thơm",
    image: "",
    price: 100000,
    unit: "cân",
    address: "Nam Từ Liêm, Hà Nội",
    status:"Đang bán",
    users:""
})
.then(data=>console.log(data))
.catch(err=> console.log(err))