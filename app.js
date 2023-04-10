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
  await mongoose.connect(process.env.MONGO_URL, {
    ssl: true,
    sslValidate: false,
  })
}
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use((err, req, res, next) => {
  res.locals.error = err
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
    error: err,
  })
})
app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000!')
})
module.exports = app
