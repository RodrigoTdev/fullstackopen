const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const router = require('./controllers/person')

app.use(express.json())
app.use(cors())
// app.use(express.static('public'))

// Morgan settings and use
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body ')
)
morgan.token('body', (request, response) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  } else {
    return ''
  }
})

app.use('/api', router)

// controlador de solicitudes con endpoint desconocido
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// controlador de errores(middleware)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
