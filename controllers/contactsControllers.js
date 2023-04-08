// const fs = require('fs').promises
const { catchAuthErr } = require('../utils')
const User = require('../model/userModal.js')
exports.createContactsList = catchAuthErr(async (req, res) => {
  const addContact = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    id: req.params.id,
  })
  console.log(addContact)
  res.status(201).json({
    contacts: addContact,
  })
})

exports.searchContactsList = catchAuthErr(async (req, res) => {
  const listContacts = await User.find()
  res.status(201).json({
    listContacts,
  })
})
exports.getContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const contacts = await User.findById(id)
  console.log(contacts)
  res.status(200).json({ contacts })
})
exports.updContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const updContacts = await User.findById(
    id,
    { name: req.body.name, email: req.body.email, phone: req.body.phone },
    { new: true },
  )
  res.status(200).json({ contacts: updContacts })
})
exports.dltContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const dltContacts = await User.findOneAndDelete(
    id,
    { name: req.body.name, email: req.body.email, phone: req.body.phone },
    { new: true },
  )
  res.status(200).json({ contacts: dltContacts })
})
