require('dotenv').config({ path: '../.env' })
const { Types } = require('mongoose')
const { catchAuthErr } = require('../utils')
const {
  createUserDataValidator,
  updateContactsDataValidator,
} = require('../utils/userValidator')
const User = require('../model/userModal.js')
const jwt = require('jsonwebtoken')

exports.validateId = catchAuthErr(async (req, res, next) => {
  const { id } = req.params
  const valideId = Types.ObjectId.isValid(id)
  if (valideId) return next(new Error(404, 'User don`t found'))
  const contacts = await User.exists({ _id: id })
  if (contacts) return next(new Error(404, 'User don`t found'))
  next()
})
exports.updArray = catchAuthErr(async (req, res, next) => {
  next()
})

exports.checkCreateLogin = catchAuthErr(async (req, res, next) => {
  const { error, value } = updateContactsDataValidator(req.body)
  console.log(error)
  if (error)
    return next(
      res.status(409).json({
        message: 'Validations error',
      }),
    )

  const UserExist = await User.exists({
    email: value.email,
    password: value.password,
  })
  if (UserExist)
    return next(
      res.status(409).json({
        message: 'Email or password is wrong',
      }),
    )

  next()
})
exports.dataConflict = catchAuthErr(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body)
  console.log(error)
  if (error)
    return next(
      new Error(400, 'Error from joi or different`s validation library'),
    )
  const UserExist = await User.exists({ email: value.email })
  if (UserExist)
    return next(
      res
        .type('application/json')
        .status(204)
        .json({ msg: 'This email in use' }),
    )
  console.log(UserExist)

  next()
})
exports.UpdDataValidator = catchAuthErr(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body)
  console.log(error)
  if (error)
    return next(
      res
        .type('application/json')
        .status(204)
        .json({ msg: 'Error from joi or different`s validation library' }),
    )
  req.body = value

  next()
})

exports.getContactStatus = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const contacts = await User.findById(id).select('-_id -email -password -__v')
  console.log(contacts)
  res.type('application/json').status(200).json({ contacts })
})

exports.validateToken = catchAuthErr(async (req, res, next) => {
  const token = req.headers.authorization?.token.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_Secret)
  if (!decoded)
    return next(
      res.type('application/json').status(401).json({
        message: 'Not authorized',
      }),
    )
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) return next(new Error(401, 'Don`t logIn to account'))
  req.user = currentUser
  next()
})
exports.allowFor = (...role) => async (req, res, next) => {
  const { favorite } = req.user
  if (role.includes(favorite)) return next()
  next(new Error(403, 'You`re forbidden, see next recources'))
}
