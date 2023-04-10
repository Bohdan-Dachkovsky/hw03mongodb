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
  checkCreateData,
  validateId,
  UpdData,
  getContactStatus,
} = require('../middlewares/contactsMiddlware.js')

router.use('/contacts:/id', validateId)
router.use('/contacts/:id/favorite', getContactStatus)
router.post('/contacts/', checkCreateData, createContactsList)
router.get('/contacts/', searchContactsList)
router.get('/contacts/:id', getContactById)
router.put('/contacts/:id', UpdData, updContactById)
router.delete('/contacts/:id', dltContactById)

module.exports = router
