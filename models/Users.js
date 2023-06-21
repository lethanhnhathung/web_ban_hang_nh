const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        require:false
    },
    address: {
        type: String,
        require:false
    },
    account: {
        type: String,
        require:false
    },
    password: {
        type: String,
        require:false
    },
    phone: {
        type: String,
        require:false
    },
    token: {
        type: String,
        required: false
    }
},{
    collection: "Users"
});
module.exports = mongoose.model('Users', UsersSchema);

