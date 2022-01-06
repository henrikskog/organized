import express from 'express'
import pool from './db.js'
import bodyParser from 'body-parser'
import { newTag, tagsByCategory } from './routes/tags.js'
import { getCategories, newCategory } from './routes/categories.js'
import { getNotes, newNote } from './routes/notes.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.DB_PORT

app.use(bodyParser.json({ extended: true }))

// origins should be spesified in prod
app.use(cors())

// routes
app.get('/categories', getCategories)
app.post('/category', newCategory)

app.get('/tags/:categoryid', tagsByCategory)
app.post('/tag', newTag)

app.get('/notes', getNotes)
app.post('/note', newNote)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))
