const { Types } = require('mongoose')
const { catchAuthErr } = require('../utils')
const { createUserDataValidator } = require('../utils/userValidator')
const User = require('../model/userModal.js')

// const uuid = require('uuid').v4
exports.generatorId = catchAuthErr(async (req, res, next) => {
  const { id } = req.params
  const valideId = Types.ObjectId.isValid(id)
  if (valideId) return next(new ErrorId(404, 'Contact don’t found'))
  const contacts = User.exists({ _id: id })
  if (contacts) return next(new ErrorId(404, 'Contact don’t found'))
  next()
})
// exports.updArray = catchAuthErr(async (req, res, next) => {
//   next()
// })
// exports.dltArray = catchAuthErr(async (req, res, next) => {
//   next()
// })
exports.checkCreateData = catchAuthErr(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body)
  if (error) return next(new AppErr())

  req.body = value

  next()
})
