
//Phương thức get ra giao diện login
exports.homePage = async (req, res ) => {
    var fileCSS = "/css/homepage.css"
    var headTitle = "Trang chủ"
    res.render('./HomePage/homepage.handlebars', { headTitle, fileCSS });
}
