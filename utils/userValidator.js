const Joi = require('joi')
const PASSWORD_RULE =
  '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}'
exports.createUserDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().max(15).required(),
      email: Joi.string().max(35).required(),
      phone: Joi.string()
        .min(9)
        .max(13)
        .regex(RegExp(PASSWORD_RULE))
        .required(),
      favorite: Joi.boolean,
    })
    .validate(data)
