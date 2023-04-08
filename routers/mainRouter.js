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
  generatorId,
  UpdData,
} = require('../middlewares/contactsMiddlware.js')

router.use('/app/contacts:/id', generatorId)
router.route('/app/contacts/:id').post(checkCreateData, createContactsList)
router.get('/app/contacts', searchContactsList)
// router.use('/app/contacts/:id', updArray)
// router.use('/app/contacts/:id', dltArray)
router.get('/app/contacts/:id', getContactById)
router.putch('app/contacts/:id', UpdData, updContactById)
router.delete('/app/contacts/:id', dltContactById)

module.exports = router
