const fs = require('fs').promises
const { handleContactsValidator } = require('../utils/fileValidator.js')
const { catchAuthErr } = require('../utils')
exports.createContactsList = catchAuthErr(async (req, res) => {
  try {
    const { error, value } = handleContactsValidator(req.body)
    console.log(error, value)
    const { name, email, phone, id } = value
    if (error) return new IdError(403, error.details[0].message)
    const userNumbers = JSON.parse(await fs.readFile('./db/contacts.json'))
    const addUser = {
      name,
      email,
      phone,
      id: id,
    }
    userNumbers.push(addUser)
    await fs.writeFile('../db/contacts.json', JSON.stringify(userNumbers))
    res.status(201).json({
      contact: addUser,
    })
  } catch (error) {
    console.log(error)
  }
})
exports.searchContactsList = catchAuthErr(async (req, res) => {
  try {
    const listContacts = JSON.parse(await fs.readFile('../db/contacts.json'))

    res.status(201).json({
      listContacts,
    })
  } catch (error) {
    console.log(error)
  }
})
exports.getContactById = catchAuthErr(async (req, res) => {
  try {
    const { id } = req.params
    const listContacts = JSON.parse(await fs.readFile('../db/contacts.json'))
    const contactGrouped = listContacts.filter((element) => element.id === id)
    res.json(contactGrouped)
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
exports.updContactById = catchAuthErr(async (req, res) => {
  try {
    const { contactGrouped } = req
    res.status(200).json({ contactGrouped })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
exports.dltContactById = catchAuthErr(async (req, res) => {
  try {
    const { contactsArr } = req
    if (contactsArr) return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
