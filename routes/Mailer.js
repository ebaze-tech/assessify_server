const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
require('dotenv').config()

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: `"${name}" <${email}>`, // Shows the sender’s email
      to: process.env.CONTACT_RECEIVER, // Admin email
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    res
      .status(200)
      .json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error sending message. Please try again later.' })
  }
})

module.exports = router
