const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://hungltngcd210409:Nhung280403@cluster0.80hrykd.mongodb.net/web_ban_hang_nh?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //console.log("connect Successfully")
  } catch (error) {
    console.log('connect failture');
  }
}
module.exports = { connect };
