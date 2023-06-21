const ProductService = require('./product.service');
const db = require('../../config/db/main');
const express = require('express');
const app = express();
const Users = require('../../models/Users');
const Product = require('../../models/Products');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
var multer = require('multer');
const { ObjectId } = require('mongodb');
const Products = require('../../models/Products');
app.use(express.json());
db.connect();

exports.createProduct = async (req, res) => {
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        const data = req.body;
        const newProduct = await ProductService.createProduct(data, req, user);    
        res.redirect('/dashboard');

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Tạo sản phẩm thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const data = req.body;
        console.log(data)
        await ProductService.updateProduct(data, req);    
        res.redirect('/dashboard');

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        return res.status(400).json({
        success: false,
        message: "Tạo sản phẩm thất bại",
        content: "Lỗi không xác định"
        });
    }
}

exports.getAllProduct = async (req, res) => {
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        const allProducts = await ProductService.getAll(user);    
        res.status(200).json({
            success: true,
            message: "Lấy sản phẩm thành công",
            content: allProducts
        });

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        res.status(400).json({
            success: false,
            message: "Lấy sản phẩm không thành công",
            content: "Lỗi không xác định"
        });
    }
}

exports.getAllProduct2 = async (req, res) => {
    try{
        const allProducts = await ProductService.getAll2();    
        res.status(200).json({
            success: true,
            message: "Lấy sản phẩm thành công",
            content: allProducts
        });

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        res.status(400).json({
            success: false,
            message: "Lấy sản phẩm không thành công",
            content: "Lỗi không xác định"
        });
    }
}

exports.getProductById = async (req, res) => {
    try{
        const product = await Products.findOne({
            _id: req.body._id
        })
        .populate('users')
        .then(data=>{
            return data;
        });    
        res.status(200).json({
            success: true,
            message: "Lấy sản phẩm thành công",
            content: product
        });

    } catch (Error)
    {
        // Nếu ko thành công -> 401
        res.status(400).json({
            success: false,
            message: "Lấy sản phẩm không thành công",
            content: "Lỗi không xác định"
        });
    }
}

exports.updateStatus = async (req, res) => {
    try{  
        const _id = req.body._id
        await Products.updateOne(
            {
                _id: new ObjectId(_id)
            },{
                status:"Đã gỡ"
        })
        res.status(200).json({
            success: true,
            message: "Thay đổi trạng thái thành công",
            content: ""
        });
    } catch (Error)
    {
        // Nếu ko thành công -> 401
        res.status(400).json({
            success: false,
            message: "Thay đổi trạng thái thất bại",
            content: Error
        });
    }
}