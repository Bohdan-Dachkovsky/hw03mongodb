require('dotenv').config({ path: '../.env' })
const { catchAuthErr } = require('../utils')
const jwt = require('jsonwebtoken')
const User = require('../model/userModal.js')
const signRFC = (id) =>
  jwt.sign({ id }, process.env.JWT_Secret, {
    expiresIn: '7d',
  })
exports.createUsersList = catchAuthErr(async (req, res) => {
  const { name, email, password } = req.body

  const addUsers = await User.create({
    name,
    email,
    password,
  })

  const token = signRFC(addUsers.id)
  console.log(addContact)
  res.type('application/json').status(201).json({ addUsers, token })
})

exports.getUsersLog = catchAuthErr(async (req, res) => {
  const { email, password } = req.body
  const logUser = await User.findOne({ email, password })
  if (!logUser) return next(new AppErr(401), 'User don`t authorized')
  const passwordIsValid = logUser.checkPassword(
    password,
    logUser.password,
  )
  if (!passwordIsValid) return next(new AppErr(401), 'Don`t authorized')
  addUsers.password = undefined

  const token = signRFC(logUser.id)

  res.type('application/json').status(200).json({
    token,
    user: {
      email,
      password,
    },
  })
})
