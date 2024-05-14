const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', route)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
