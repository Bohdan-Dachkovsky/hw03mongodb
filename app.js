const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' })
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routers/mainRouter.js')
const logger = require('morgan')
if ((process.env.NODE_ENV = 'development')) app.use(logger('dev'))

main()
  .then((connect) => {
    console.log('Database connection successful')
    // console.log(connect)
  })
  .catch((err) => console.log(err))

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
}
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', router)
app.use((err, req, res, next) => {
  const msg = Array.isArray(err.message) ? err.message.join(';;') : err.message
  res.status(err || 500).json({
    message: err.message,
    stack: err,
  })
})
app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000!')
})
module.exports = app
