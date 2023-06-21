const express = require('express');
const router = express.Router();
const ProductController = require('./product.controller');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
var multer = require('multer');

var storage = multer.diskStorage({
    destination : (req, file, res) => {
        const user = JSON.parse(localStorage.getItem('user'));
        res(null, './public/image/product/' + user.account)
    },
    filename : (req, file, res)=>{
        const now = new Date();
        const miliSeconds = now.getTime();
        res(null, miliSeconds + '.png')
    }
});

var upload = multer({ storage : storage });

//phương thức create product
router.post('/createProduct', upload.single("fileName"), ProductController.createProduct);

router.post('/updateProduct', upload.single("fileName"), ProductController.updateProduct);

router.get('/getAllProduct', ProductController.getAllProduct );

router.get('/getAllProduct2', ProductController.getAllProduct2 );

router.post('/getProductById', ProductController.getProductById );

router.post('/updateStatus', ProductController.updateStatus);



module.exports = router;