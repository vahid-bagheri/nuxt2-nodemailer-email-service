const express = require('express')
const nodemailer = require('nodemailer')
const validator = require('validator')
const xssFilters = require('xss-filters')

const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  res.status(405).json({ error: 'Sorry!' })
})

app.post('/', function (req, res) {
  const { to, subject, name, email, message } = req.body

  const errors = {}

  // Define validation functions
  const validateTo = () => validator.isEmail(to)
  const validateSubject = () => true // TODO: Add validation for subject
  const validateName = () => name.length > 3
  const validateEmail = () => validator.isEmail(email)
  const validateMessage = () => message.length > 25

  // Validate input fields
  errors.to = validateTo() ? null : 'To address is invalid.'
  errors.subject = validateSubject() ? null : 'Subject is required.'
  errors.name = validateName() ? null : 'Name is too short.'
  errors.email = validateEmail() ? null : 'Email address is invalid.'
  errors.message = validateMessage() ? null : 'Message is too short.'

  // If there are errors, return them
  if (Object.values(errors).some(Boolean)) {
    return res
      .status(422)
      .json({ error: Object.values(errors).filter((error) => error) })
  }

  // Sanitize input fields
  const sanitizedInputs = {
    to: xssFilters.inHTMLData(to),
    subject: xssFilters.inHTMLData(subject),
    name: xssFilters.inHTMLData(name),
    email: xssFilters.inHTMLData(email),
    message: xssFilters.inHTMLData(message),
  }

  // Send email
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  transporter
    .sendMail({
      from: process.env.SMTP_USERNAME,
      ...sanitizedInputs,
    })
    .then(() => console.log('OK, Email has been sent. '))
    .catch(console.error)

  res.status(200).json({ message: 'Email sent successfully.' })
})

module.exports = {
  path: '/api/contact',
  handler: app,
}
