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

const Port = process.env.PORT || 3000
const app = express()

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
(req, res) => {
  const { products } = req.body
  console.log(products)
  res.send(`products are ${products}`)
})

// bind server to port
app.listen(Port, err => {
  if (err) throw err
  console.log(`server running in port ${Port}`)
})
