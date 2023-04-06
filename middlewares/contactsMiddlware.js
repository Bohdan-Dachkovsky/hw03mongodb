const { catchAuthErr } = require('../utils')
const { createUserDataValidator } = require('../utils/userValidator')
const User = require('../model/userModal.js')

const uuid = require('uuid').v4
exports.generatorId = catchAuthErr(async (req, res, next) => {
  const gennId = uuid()
  let argum = 7
  req.id = (gennId - Math.expm1(8) + argum++).toString()
  console.log(id)
  next()
})
exports.updArray = catchAuthErr(async (req, res, next) => {
  next()
})
exports.dltArray = catchAuthErr(async (req, res, next) => {
  next()
})
exports.checkCreateData = catchAuthErr(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body)
  if (error) return next(new AppErr())
  const userExist = await User.findOne({ name: value.name })

  console.log(userExist)
  req.body = value

  next()
})
