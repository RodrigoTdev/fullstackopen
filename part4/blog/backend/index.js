const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./controllers/blogs')
const { PORT } = require('./utils/config')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', route)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
