const express = require('express')
const router = express.Router()
const { handleContactsValidator } = require('../utils/fileValidator.js')
const { handleIndeIndentificatorVal } = require('../utils/fileValidator.js')
const fs = require('fs').promises
const path = require('path')
const uuid = require('uuid').v5

router.use((req, res, next) => {
  let argum = 7
  req.id = Math.floor(Math.random(10) * Math.expm1(8) - 2 + argum++).toString()
  next()
})
router.use('/app/contacts/:id', async (req, res, next) => {
  try {
    const { error, value } = handleIndeIndentificatorVal(req.params)
    const { id } = value
    if (error) return new IdError(403, error.details[0].message)
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    const contactGrouped = listContacts.find((element) => element.id === id)
    if (!contactGrouped) return res.status(404).json({ message: 'Not found' })
    req.contactGrouped = contactGrouped
    next()
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
router.use('/app/contacts/:id', async (req, res, next) => {
  try {
    const { error, value } = handleIndeIndentificatorVal(req.params)
    const { id } = value
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )

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
router.post('/app/contacts', async (req, res) => {
  try {
    const { error, value } = handleContactsValidator(req.body)
    console.log(error, value)
    const { name, email, phone, id } = value
    if (error) return new IdError(403, error.details[0].message)
    const userNumbers = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    const addUser = {
      name,
      email,
      phone,
      id: id,
    }
    userNumbers.push(addUser)
    await fs.writeFile(
      './data/listOfContacts.json',
      JSON.stringify(userNumbers),
    )
    res.status(201).json({
      contact: addUser,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/app/contacts', async (req, res) => {
  try {
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )

    res.status(201).json({
      listContacts,
    })
  } catch (error) {
    console.log(error)
  }

  //console.log(req)
})
router.get('/app/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    const contactGrouped = listContacts.filter((element) => element.id === id)
    res.json(contactGrouped)
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
router.delete('/app/contacts/:id', async (req, res) => {
  try {
    const { contactsArr } = req
    if (contactsArr) return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})
router.put('/app/contacts/:id', async (req, res) => {
  try {
    const { contactGrouped } = req
    res.status(200).json({ contactGrouped })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
})

module.exports = router
