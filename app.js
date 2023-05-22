const express = require('express')
const path = require('path')
// const fs = require('fs').promises
const app = express()
const multer = require('multer')
require('dotenv').config({ path: './.env' })
app.use(express.urlencoded({ extended: false }))
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const uploadDir = path.join(__dirname, 'temp')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
      },
      filename: (req, file, cb) => {
        cb(null, file.gitpicture)
      },
      limits: {
        fileSize: 9500000,
      },
})
const upload = multer({
    storage: storage,
  })
const files = []
app.get('/avatars', (req, res) => {
res.json(files)
}) 
app.post('/avatars', upload.single('photo'), (res, req) => {
// await fs.rename()
}) 
app.listen(process.env.PORT, () => {
console.log('File is running with multer')
})
module.exports = app