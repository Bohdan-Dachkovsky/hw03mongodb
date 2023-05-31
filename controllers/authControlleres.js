require('dotenv').config({ path: '../.env' })
const { catchAuthErr } = require('../utils')
const path = ('path')
const fs = require('fs/promises')
const nanoid = require('nanoid')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const User = require('../model/userModal.js')
const files = []
const signRFC = (id) =>
  jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: '7d',
  })
exports.createUsersList = catchAuthErr(async (req, res) => {
  const { name, email, password } = req.body
  const avatarURL = gravatar.url(email)

  const addUsers = await User.create({
    name,
    email,
    password,
    avatarURL,
  })
  
  const token = signRFC(addUsers.id)
  console.log(addUsers)
  res.type('application/json').status(201).json({ addUsers, token })
})

exports.getUsersLog = catchAuthErr(async (req, res, next) => {
  const { email, password } = req.body
  const logUser = await User.findOne({ email, password })
  if (!logUser) return next(new Error(401), 'User don`t authorized')
  const passwordIsValid = logUser.checkPassword(
    password,
    logUser.password,
  )
  if (!passwordIsValid) return next(new Error(401), 'Don`t authorized')
  logUser.password = undefined

  const token = signRFC(logUser.id)
  res.type('application/json').status(200).json({
    token,
    user: {
      email,
      password,
    },
  })
})

exports.updateAvatars = catchAuthErr(async (req, res) => {
  const {id} = req.user
  const {path: tempUpload, originalName} = req.file
  const avatarDir = path.resolve(__dirname, '../', 'public', 'avatars')
  const resultUpload = path.resolve(avatarDir, originalName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('avatars', originalName)
    await User.findByIdAndUpdate(id, avatarURL)
})


exports.sendFile = catchAuthErr(async(res, req) => {
    const {originalName} = req.file
    const tempUpload = path.join(__dirname, "../", "temp", originalName)
    const photoDir = path.join(__dirname, "../", "public", "avatars", originalName)
    
  
    try {
      await fs.rename(tempUpload, photoDir)
    } catch(error) {
    fs.unlink(tempUpload)
    }
    const newPath = path.join('avatars', originalName)
    const newPhoto = {
    id: nanoid(),
    ...req.body,
    newPath
    }
    files.push(newPhoto)
    res.status(201).json(newPhoto)
  
  }
  )
exports.downloadFile = async (req,res) => {
try {
res.status(201).json(files)
} catch(err) {
  res.status(501).json(err.message)
}
}
