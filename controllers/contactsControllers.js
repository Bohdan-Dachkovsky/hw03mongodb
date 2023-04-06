// const fs = require('fs').promises
const { catchAuthErr } = require('../utils')
const User = require('../model/userModal.js')
exports.createContactsList = catchAuthErr(async (req, res) => {
  const { id } = req.params

  const addUser = {
    name: 'Anders',
    email: 'Ad@ros.ua',
    phone: '+3809434343',
    id: id,
  }

  res.status(201).json({
    contacts: addUser,
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
  const contacts = User.findById(id)

  res.status(200).json({ contacts })
})
exports.updContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const updContacts = await User.findById(id, { name: req.body.name })
  res.status(200).json({ contact: updContacts })
})
exports.dltContactById = catchAuthErr(async (req, res) => {
  const { id } = req.params
  const dltContacts = await User.findOneAndDelete(id, { name: req.body.name })
  res.status(200).json({ contact: dltContacts })
})
