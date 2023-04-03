const Joi = require('joi')
const PASSWORD_RULE = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'
exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().max(35).required(),
      phone: Joi.string().min(9).max(13).regex(PASSWORD_RULE).required(),
      id: Joi.string().max(35).required(),
    })
    .validate(data)
