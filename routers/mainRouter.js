const express = require('express')
const {upload} = require('../middlewares/upload.js')
const router = express.Router()
const {
  createUsersList,
  getUsersLog,
  updateAvatars,
  sendFile,
  downloadFile
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
router.putch('/avatars',  upload.single('avatars'), updateAvatars)
router.get('/avatars', downloadFile) 
router.post('/avatars', upload.single('photo'), sendFile) 
module.exports = router
