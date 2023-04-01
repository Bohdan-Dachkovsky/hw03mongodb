const express = require('express')
const app = express()
require('dotenv').config({ path: './.env' })
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routers/mainRouter.js')
const logger = require('morgan')
if ((process.env.NODE_ENV = 'development')) app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000!')
})
module.exports = app
