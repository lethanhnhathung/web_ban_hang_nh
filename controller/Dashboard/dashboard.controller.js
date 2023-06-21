const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
//Phương thức get ra giao diện login
exports.dashboard = async (req, res ) => {
    var headTitle = "Thành viên"
    var fileCSS = "/css/dashboard.css"
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated == "false") {
        res.redirect('/login');
      } else {
        var headTitle = "Thành viên"
        //res.redirect('/dashboard');
        res.render('./Dashboard/dashboard.handlebars', { headTitle, fileCSS });
      }
}

exports.createProduct = async (req, res ) => {
      res.redirect('/dashboard');
}

exports.updateProduct = async (req, res ) => {
  res.redirect('/dashboard');
}

