const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'temp')
      console.log(uploadDir)
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
   storage,
  })
