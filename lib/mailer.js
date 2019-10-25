const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const isProduction = process.env.NODE_ENV === 'production'

const options = {
  viewEngine : {
    extname: '.hbs', // handlebars extension
    layoutsDir: 'views/layouts/', // location of handlebars templates
    defaultLayout: 'main', // name of main template
    partialsDir: 'views/mail', // location of your subtemplates aka. header, footer etc
},
  viewPath: 'views/mail',
  extName: '.hbs'
}


const sendMail = async (to, subject, order) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host:  isProduction ? 'smtp.gmail.com' : 'smtp.ethereal.email',
    port: isProduction ? 465 : 587,
    secure: isProduction, // true for 465, false for other ports
    auth: {
      user: isProduction ? process.env.MAIL_USER : testAccount.user, 
      pass: isProduction ? process.env.MAILER_PWD : testAccount.pass
    }
  })
  transporter.use('compile', hbs(options))
  const send = await transporter.sendMail({
    from: '"Ordenes de compra 🍔" <ordersboot@sesamo.com>',
    to,
    subject,
    context: order,
    template: 'template'
  })

  console.log('message sent %s', send.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(send))
}

module.exports = sendMail