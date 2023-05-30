const express = require('express')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config({ path: './.env' })
app.use(express.urlencoded({ extended: false }))
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routers/mainRouter.js')
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use( '/', router)
const logger = require('morgan')
const {META_PASSWORD} = process.env
if ((process.env.NODE_ENV = 'development')) app.use(logger('common'))
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
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

const nodemailerConfig = {
host: 'smtp.meta.ua',
port: 465,
secure: true,
auth: {
user: 'bohdanukr.meta@ua',
pass: META_PASSWORD
}
}
const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: 'bohdanukr@meta.ua',
    }
    transport.sendMail(email).then(() => {console.log('Email came')}).catch((err) => {console.log(err.message)})
}
module.exports = sendEmail

mongoose.connection.once('open', () => {
  console.log('Connected to db!')
  app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3001!')
  })
})
module.exports = app