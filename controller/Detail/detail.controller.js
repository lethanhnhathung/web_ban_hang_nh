
//Phương thức get ra giao diện login
exports.detail = async (req, res ) => {
    var headTitle = "Chi tiết sản phẩm"
    const id = req.params.id;
    res.render('./Detail/detail.handlebars', { headTitle, id });
}
