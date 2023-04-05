const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
})
const User = mongoose.model('User', userShema)
module.exports = User
