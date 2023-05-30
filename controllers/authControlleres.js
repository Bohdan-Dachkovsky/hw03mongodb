require('dotenv').config({ path: '../.env' })
const {BASE_URL} = process.env
const { catchAuthErr } = require('../utils')
const {sendEmail} = require('../app.js')
const path = ('path')
const fs = require('fs/promises')
const nanoid = require('nanoid')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const User = require('../model/userModal.js')

const signRFC = (id) =>
  jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: '7d',
  })
exports.createUsersList = catchAuthErr(async (req, res) => {
  const { name, email, password } = req.body
  const avatarURL = gravatar.url(email)
  const verificationCode = nanoid()
  const addUsers = await User.create({
    name,
    email,
    password,
    avatarURL,
    verificationCode,
  })
  const verifyEmail = {
    to: email,
    subject: 'Test email',
    html: `<a target ="_blank" href ='${BASE_URL}/users/verify/${verificationCode}'><b>Click for verify email adress</b></a>`
    }
    await sendEmail(verifyEmail)
  const token = signRFC(addUsers.id)
  console.log(addUsers)
  res.type('application/json').status(201).json({ addUsers, token })
})
exports.verifyEmail = catchAuthErr(async (req, res, next) => {
const {verificationCode} = req.params
const user = await User.findOne({verificationCode})
if (!user) return next(new Error(401), 'Email doesn’ exist')
await User.findByIdAndUpdate(user.id, {verify: true, verificationCode:''});

res.status(201).json({
message: 'Email verify sucssesfuly'
})
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
  if (!logUser.verify) return next(new Error(401), 'Error and password isn’t valid')
  const token = signRFC(logUser.id)
  res.type('application/json').status(200).json({
    token,
    user: {
      email,
      password,
    },
  })
})
const avatarDir = path.join(__dirname, '../', 'public', 'avatars')
exports.updateAvatars = catchAuthErr(async (req, res) => {
  const {id} = req.user
  const {path: tempUpload, originalName} = req.file
  const resultUpload = path.join(avatarDir, originalName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('avatars', originalName)
    await User.findByIdAndUpdate(id, avatarURL)
})
const photoDir = path.join(__dirname, "public", "avatars")

const files = []
exports.sendFile = catchAuthErr(async(res, req) => {
    const {path: tempUpload, originalName} = req.file
    const resultUpload = path.join(photoDir, originalName)
    try {
      await fs.rename(tempUpload, resultUpload)
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
