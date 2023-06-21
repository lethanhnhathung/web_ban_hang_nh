const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const swaggerUi = require("swagger-ui-express");
const { swaggerJsonData } = require("./api-docs/swagger.js");
const Users = require('./models/Users');
const Products = require('./models/Products');
const morgan = require('morgan');
const app = express();
app.use(express.json());
const port = 3000;

//Require file routes được export ra
/************************************** 
*                                     *
* Sử dụng các hàm và tinh chỉnh       *
*                                     *
***************************************/

//tạo được dẫn public truy cập bằng :http://localhost:3000/Anhchinh/ten_anh.png
app.use(express.static(path.join(__dirname, 'public')));

//tạo được dẫn public truy cập bằng :http://localhost:3000/script/tên_script.js
app.use(express.static(path.join(__dirname, 'view')));

//Setup một số thư viện hỗ trợ
app.use(morgan('combined'));

app.engine('handlebars', handlebars());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'view'));

//user router here
const router = express.Router();

//Api đăng nhập
router.use("/auth", require('./routes/auth/auth.route.js'));

//Api sản phẩm
router.use("/product", require('./routes/products/product.route.js'))

// Sử dụng api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonData));

// Trỏ tới file dashboard
router.use("/", require('./controller/Login/login.route.js'));

router.use("/", require('./controller/Dashboard/dashboard.route.js'));

router.use("/", require('./controller/Detail/detail.route.js'));

router.use("/", require('./controller/HomePage/homepage.route.js'));

router.use("/", require('./controller/SignUp/signup.route.js'));

app.use(router);


/** KẾT THÚC TEST */
/******************************** 
*                               *
* Hàm nghe Users ấn vào trang   *
*                               *
*********************************/ 
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

