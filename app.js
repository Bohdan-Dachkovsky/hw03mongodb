const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv').config({ path: './.env' })
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routers/mainRouter.js')
const logger = require('morgan')
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', router)
if ((process.env.NODE_ENV = 'development')) app.use(logger('dev'))

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    ssl: true,
    sslValidate: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    serverSelectionTimeoutMS: 5000,
  })
}
main()
  .then((connect) => {
    console.log('Database connection successful')
     console.log(connect)
  })
  .catch((err) => console.log(err))

app.use((err, req, res, next) => {
  res.locals.error = err
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
    error: err,
  })
})
mongoose.connection.once('open', () => {
  console.log('Connected to db!')
  app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000!')
  })
})

module.exports = app
