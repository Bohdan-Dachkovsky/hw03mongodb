const { catchAuthErr } = require('../utils')
const User = require('../model/userModal.js')
const { application } = require('express')

exports.getSearchedUser = catchAuthErr(async (req, res) => {
  const {name} = req.body
  const userFound = await User.find(name)
  const token = 'jwtAthor'
  if (!userFound) {
    return res.status(401).json({
      message: 'User don`t authorized',
    })
  } else {
    return res
      .type(application / json)
      .status(200)
      .json({
        message: `Baerer ${token}`,
      })
  }
})
exports.searchContactsList = catchAuthErr(async (req, res) => {
  const listContacts = await User.find()
  res.type('application/json').status(201).json({
    listContacts,
  })
})

exports.updateContact = catchAuthErr(async (req, res) => {
  const { _id } = req.params
  const updContacts = await User.findByIdAndUpdate(_id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    favorite: true,
  })
  res.type('application/json').status(200).json({ contacts: updContacts })
})


exports.getOffUsers = catchAuthErr(async (req, res) => {
  const user = await User.findOne({ email });
  const searchedUser = await User.findOne(user.id)
  const deleteUserToken = await User.deleteOne({
   token: user.token
  })

  if (searchedUser) {
    return res
      .type('application/json')
      .status(200)
      .json({ message: `Bearer: ${deleteUserToken}` })
  }
   else {
   if(!user && !user.token) {
    return res
    .type('application/json')
    .status(401)
    .json({ message: 'Not authorized' })
}
   }
})
