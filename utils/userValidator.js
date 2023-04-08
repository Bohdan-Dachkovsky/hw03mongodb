const Joi = require('joi')
// const PASSWORD_RULE = '^[0-9+]{7}-[0-9+]{1}$'
exports.createUserDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().max(35).required(),
      phone: Joi.string().min(9).max(13).required(),
      favorite: Joi.boolean,
    })
    .validate(data)
exports.updateContactsDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().max(15),
      email: Joi.string().max(35),
      phone: Joi.string().min(9).max(13),
      favorite: Joi.boolean,
    })
    .validate(data)
