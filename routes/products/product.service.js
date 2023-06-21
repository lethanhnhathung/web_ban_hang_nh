const Users = require('../../models/Users');
const Products = require('../../models/Products');
const db = require('../../config/db/main');
const { ObjectId } = require('mongodb');
var multer = require('multer');
db.connect();

// Lấy thông tin người dùng có email và role giống như trong req
exports.createProduct = async (data, req, user) => {
    const path = "http://localhost:3000/" + req.file.destination.replace("./public","") + "/" + req.file.filename;
    const newProduct = await Products.create({
        name: data.name,
        image: path,
        price: data.price,
        unit: data.unit,
        address: data.address,
        status: "Đang bán",
        users: new ObjectId(user._id)
    })
    .then((newProduct) => {
        return newProduct;
    }).catch((err) => {
    console.log(err);
        return {};
    });
    return newProduct;
}

exports.updateProduct = async (data, req) => {
    console.log(data)
    if(typeof(req.file) != "undefined")
    {
        const path = "http://localhost:3000/" + req.file.destination.replace("./public","") + "/" + req.file.filename;
        await Products.updateOne(
            {
                _id: new ObjectId(data._id)
            },{
                name: data.name,
                image: path,
                price: data.price,
                unit: data.unit,
                address: data.address,
            })
    }
    else{
        await Products.updateOne(
            {
                _id: new ObjectId(data._id)
            },{
                name: data.name,
                price: data.price,
                unit: data.unit,
                address: data.address,
            })
    }
}

exports.getAll = async (users) => {

    const allProducts = await Products.find({
        users: new ObjectId(users._id)
    })
    .then((allProducts) => {
        return allProducts;
    }).catch((err) => {
    console.log(err);
        return {};
    });

    return allProducts;
}

exports.getAll2 = async () => {

    const allProducts = await Products.find({})
    .then((allProducts) => {
        return allProducts;
    }).catch((err) => {
    console.log(err);
        return {};
    });

    return allProducts;
}




