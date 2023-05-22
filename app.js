const express = require('express')
const path = require('path')
const fs = require('fs/promises')
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
        cb(null, file.originalname)
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
const photoDir = path(__dirname, "public", "avatars")
app.post('/avatars', upload.single('photo'), async(res, req) => {
  const {path: tempUpload, originalName} = req.file
  const resultUpload = path.join(photoDir, originalName)
await fs.rename(tempUpload, resultUpload)
}) 
app.listen(process.env.PORT)
module.exports = app