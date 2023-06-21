const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name: {
        type: String,
        require:false
    },
    image: {
        type: String,
        require:false
    },
    price: {
        type: Number,
        require:false
    },
    unit: {
        type: String,
        require:false
    },
    address: {
        type: String,
        require:false
    },
    status:{
        type: String,
        require:false
    },
    users:{
        type: Schema.Types.ObjectId,
        ref:'Users',
        require:false
    }
},{
    collection: "Products"
});
module.exports = mongoose.model('Products', ProductsSchema);

