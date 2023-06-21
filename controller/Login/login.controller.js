
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
//Phương thức get ra giao diện login
exports.login = async (req, res ) => {
    //localStorage.setItem('isAuthenticated', 'false');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    // console.log(isAuthenticated); 
    
    if (isAuthenticated == "true") {
        res.redirect('/dashboard');
      } else {
        var headTitle = "Đăng nhập"
        //res.redirect('/dashboard');
        res.render('./Login/login.handlebars', { headTitle });
      }
}

