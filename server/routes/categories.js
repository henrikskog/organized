import pool from '../db.js'

const newCategory = async (req, res) => {
  const { name } = req.body

  // execute will internally call prepare and query
  const [results, err] = await pool.execute('insert into Tag_Category(name) values(?)', [name])

  if (err) {
    console.log(err)
  }

  // If you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance
  res.json({ insertId: results.insertId })
}
const getCategories = async (req, res) => {
  const [rows] = await pool.execute('select * from Tag_Category')

  res.json(rows)
}

export { newCategory, getCategories }
