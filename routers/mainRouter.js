const express = require('express')
const router = express.Router()
const {
  createUsersList,
  getUsersLog,
} = require('../controllers/authControlleres.js')

const {
  searchContactsList,
  getOffUsers,
  getSearchedUser,
  updateContact
} = require('../controllers/contactsControllers.js')
const {
  UpdDataValidator,
  checkCreateLogin,
  dataConflict,
  getContactStatus,
  validateToken,
  allowFor,
  validateId,
} = require('../middlewares/contactsMiddlware.js')
const { userRole } = require('../variables/constant.js') 
router.use('/contacts:/id', validateId)
router.all('*', validateToken, allowFor(userRole.MASTER))
router.get('/contacts/:id/favorite', getContactStatus)
router.post('/users/register', UpdDataValidator, dataConflict, createUsersList)
router.get('/users/login', checkCreateLogin, getUsersLog)
router.get('/users/logout', getOffUsers)

router.get('/contacts?page=1&limit=20', searchContactsList)

router.get('/users/current', getSearchedUser)
router.put('/:id', updateContact)

module.exports = router
