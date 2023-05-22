const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
require('dotenv').config({ path: './.env' })
app.use(express.urlencoded({ extended: false }))
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const uploadDir = path.join(process.cwd(), 'temp')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
      limits: {
        fileSize: 1048576,
      },
})
const upload = multer({
    storage: storage,
  })
const files = []
app.get('/avatars', (req, res) => {
res.json({files})
}) 
app.post('/avatars', upload.single('foto'), (res, req) => {
console.log(req.file)
}) 
app.listen(process.env.PORT, () => {
console.log('Uploading file in multer!')
})
module.exports = app