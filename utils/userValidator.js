const Joi = require('joi')
const PASSWORD_RULE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
exports.createUserDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().max(35).required(),
      phone: Joi.string().min(9).max(13).regex(PASSWORD_RULE).required(),
    })
    .validate(data)
