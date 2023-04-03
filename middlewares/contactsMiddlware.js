const fs = require('fs').promises
const {catchAuthErr} = require('../utils')
const { handleIndeIndentificatorVal } = require('../utils/fileValidator')
const { createUserDataValidator } = require('../utils/userValidator')
const uuid = require('uuid').v5
exports.generatorId = catchAuthErr(async(req, res, next) => {
  const gennId = uuid()
  let argum = 7
  req.id = (gennId - Math.expm1(8) + argum++).toString()
  next()
})
exports.updArray = catchAuthErr(async (req, res, next) => {
  try {
    const { error, value } = handleIndeIndentificatorVal(req.params)
    const { id } = value
    if (error) return new IdError(403, error.details[0].message)
    const listContacts = JSON.parse(await fs.readFile('./db/contacts.json'))
    const contactGrouped = listContacts.find((element) => element.id === id)
    if (!contactGrouped) return res.status(404).json({ message: 'Not found' })
    req.contactGrouped = contactGrouped
    next()
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
exports.dltArray = catchAuthErr(async (req, res, next) => {
  try {
    const { error, value } = handleIndeIndentificatorVal(req.params)
    const { id } = value
    const listContacts = JSON.parse(await fs.readFile('./db/contacts.json'))

    if (error) return new IdError(403, error.details[0].message)
    const contactsGrouped = listContacts.find((element) => element.id !== id)
    if (!contactsGrouped) return res.status(404).json({ message: 'Not found' })
    req.contactsArr = contactsGrouped
    next()
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
exports.checkCreateData = async (req, res, next) = {
  const { error, value } = createUserDataValidator(req.body)
}
