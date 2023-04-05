// const fs = require('fs').promises
const { catchAuthErr } = require('../utils')
const User = require('../model/userModal.js')
exports.createContactsList = catchAuthErr(async (req, res) => {
  const addUser = await User.create(req.body)
  // console.log(error, value)
  // const { name, email, phone, id } = value
  // const userNumbers = JSON.parse(await fs.readFile('./db/contacts.json'))
  // const addUser = {
  //   name,
  //   email,
  //   phone,
  //   id: id,
  // }
  // userNumbers.push(addUser)
  // await fs.writeFile('../db/contacts.json', JSON.stringify(userNumbers))
  res.status(201).json({
    contacts: addUser,
  })
})
exports.searchContactsList = catchAuthErr(async (req, res) => {
  // const listContacts = JSON.parse(await fs.readFile('../db/contacts.json'))
  const listContacts = await User.find()
  res.status(201).json({
    listContacts,
  })
})
exports.getContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const contacts = User.findById(id)
  // const listContacts = JSON.parse(await fs.readFile('./db/contacts.json'))
  // const contactGrouped = listContacts.filter((element) => element.id === id)
  res.status(200).json({ contacts })
})
exports.updContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const update = await User.findById(id, { name: req.body.name })
  res.status(200).json({ contact: update })
})
exports.dltContactById = catchAuthErr(async (req, res) => {
  // const { contactsArr } = req.body
  // if (contactsArr) return res.status(200).json({ message: 'contact deleted' })
})
