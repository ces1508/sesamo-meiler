const nodemailer = require('nodemailer')

const sendMail = async (to, subject) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'ces1508@gmail.com', // generated ethereal user
      pass: '147896325Ces1' // generated ethereal password
    }
  })
  const send = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject,
    html: '<b>Hello world?</b>'
  })

  console.log('message sent %s', send.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(send))
}

module.exports = sendMail