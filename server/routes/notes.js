import pool from '../db.js'

const newNoteTagIds = async (req, res) => {
  const { name, org_number, tags } = req.body

  // execute will internally call prepare and query
  const [results, err] = await pool.execute('insert into Note(name, org_number) values(?, ?)', [name, org_number])

  if (err) {
    console.log('error inserting note', err)
  }

  if (tags.length) {
    const bindingValues = tags.map((tagId) => [results.insertId, tagId])

    pool.query('insert into Note_Tag (note_id, tag_id) values ?', [bindingValues], (err) => {
      if (err) throw err
    })
  }

  // If you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance
  res.json({ response: 'successfully inserted data' })
}

const newNote = async (req, res) => {
  const { name, org_number, tags } = req.body

  // execute will internally call prepare and query
  const [results, err] = await pool.execute('insert into Note(name, org_number) values(?, ?)', [name, org_number])

  if (err) {
    console.log('error inserting note', err)
  }

  if (tags) {
    const bindingValues = tags.map((tagId) => [results.insertId, tagId])

    pool.query('insert into Note_Tag (note_id, tag_id) values ?', [bindingValues], (err) => {
      if (err) throw err
    })
  }

  // If you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance
  res.json({ response: 'successfully inserted data' })
}

const queryTagId = async (name) => {}

const getNotes = async (req, res) => {
  const [rows] = await pool.execute('select * from Note;')
  console.log(JSON.stringify(rows))

  res.json(rows)
}

export { newNoteTagIds as newNote, getNotes }
