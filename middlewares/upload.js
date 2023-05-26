const path = require('path')
const multer = require('multer')
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
exports.upload = multer({
    storage: storage,
  })
