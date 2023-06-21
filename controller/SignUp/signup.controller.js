
//Phương thức get ra giao diện login
exports.signUp = async (req, res ) => {
    var headTitle = "Đăng ký"
    var fileCSS = "/css/signup.css"
    res.render('./SignUp/signup.handlebars', { headTitle, fileCSS });
}
