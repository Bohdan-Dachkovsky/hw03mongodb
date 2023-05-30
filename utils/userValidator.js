const Joi = require('joi')
// const PASSWORD_RULE = '^[0-9+]{7}-[0-9+]{1}$'
exports.createUserDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(2).max(35).required(),
      email: Joi.string().max(35).required(),
      password: Joi.string().min(15).max(30).required(),
    })
    .validate(data)
exports.updateContactsDataValidator = (data) =>
  Joi.object()
    .keys({
      email: Joi.string().min(9).max(35).required(),
      password: Joi.string().min(15).max(30).required(),
      favorite: Joi.boolean.require(),
    })
    .validate(data)
