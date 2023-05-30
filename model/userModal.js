const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { error } = require('console')
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [false, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    require: true,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  }
})

userShema.pre('findOne', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 11
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)
    if (error) return next(error)
    next()
  }
})
userShema.methods.checkPasword = (userPassword, hash) =>
  bcrypt.compare(userPassword, hash)
const User = mongoose.model('user', userShema)
module.exports = User
