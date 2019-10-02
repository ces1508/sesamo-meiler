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
 * 2 body-parser
 * this dependencies get body request
 * and wrap it in a javascirpt object
 *
 * 3 helmet
 * this dependencies is a wrapped
 * of multiples good practices of security
 */
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const Port = process.env.PORT
const app = express()

// start inject middlewares

app.use(bodyParser.json())
app.use(helmet())

// end middleware

// bind server to port
app.listen(Port, err => {
  if (err) throw err
  console.log(`server running in port ${Port}`)
})
