const Joi = require('joi')
const PASSWORD_RULE = /s*(?:\+?(\d{1,3}))?[\W\D\s]^|()*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d[\W\D\s]*?\d)(?: *x(\d+))?\s*$/
exports.createUserDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().max(35).required(),
      phone: Joi.number().min(9).max(13).regex(PASSWORD_RULE).required(),
      favorite: Joi.boolean,
    })
    .validate(data)
