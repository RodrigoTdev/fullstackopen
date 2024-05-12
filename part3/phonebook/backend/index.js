const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

let db = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(db)
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${db.length} people</p><p>${new Date()}</p>`
  )
})

app.post('/api/persons', (req, res) => {
  const { id, name, number } = req.body

  const newPerson = {
    id: Number(id),
    name,
    number,
  }
  //  Por ahora funciona pero no se guarda realmente
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  if (db.some((person) => person.name === newPerson.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  // const newDb = db.concat(newPerson)
  db.push(newPerson)
  res.status(201).json(db)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  db = db.filter((item) => item.id !== id)
  res.status(204).end()
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = req.body
  db = db.map((item) => {
    if (item.id === id) {
      return person
    } else {
      return item
    }
  })
  res.status(201)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
