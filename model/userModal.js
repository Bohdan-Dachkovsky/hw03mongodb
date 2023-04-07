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
  id: {
    type: String,
    require: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    require: true,
  },
})
const User = mongoose.model('User', userShema)
module.exports = User
