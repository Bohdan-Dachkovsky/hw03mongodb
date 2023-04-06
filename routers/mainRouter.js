const express = require('express')
// const fs = require('fs').promises
const router = express.Router()
const {
  createContactsList,
  searchContactsList,
  getContactById,
  dltContactById,
  updContactById,
} = require('../controllers/contactsControllers.js')
const {
  updArray,
  dltArray,
  checkCreateData,
} = require('../middlewares/contactsMiddlware.js')

//router.use('/app/contacts', generatorId)
router.post('/app/contacts/:id', checkCreateData, createContactsList)
router.get('/app/contacts', searchContactsList)
router.use('/app/contacts/:id', updArray)
router.use('/app/contacts/:id', dltArray)
router.get('/app/contacts/:id', getContactById)
router.put('app/contacts/:id', updContactById)
router.delete('/app/contacts/:id', dltContactById)

module.exports = router
