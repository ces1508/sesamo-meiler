/**
 * in this project i will be use
 * next dependencies
 * 1 express
 * 2 body-parser
 * 3 helemt
 *
 * 1 express is a dependencies to
 * build server with node
 *
 * 2 helmet
 * this dependencies is a wrapped
 * of multiples good practices of security
 */
const express = require('express')
const helmet = require('helmet')
const { check, validationResult } = require('express-validator')
const exphbs = require('express-handlebars')
const lib = require('./lib')

const Port = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({})

// set handlebars as template engine
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', 'hbs')

// start inject middlewares

app.use(express.json())
app.use(helmet())

// end middleware

// start routes

app.post('/notify', [
  check('products').isArray()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: 'invalid data' })
  }
  next()
},
async (req, res) => {
  const { products } = req.body
  try {
    await lib.sendMail('ces1508@gmail.com', 'Nueva orden de compra', { ...req.body})
    res.render('mail/template', { ...req.body })
  } catch (e) {
    res.status(500).json({ error: {
      message: e.message,
      stack: e.stack
    } })
  }
})

// bind server to port
app.listen(Port, err => {
  if (err) throw err
  console.log(`server running in port ${Port}`)
})
