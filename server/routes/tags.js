import pool from '../db.js'

const tagsByCategory = async (req, res) => {
  const [rows] = await pool.execute('select * from Tag where Tag.category_id = ' + req.params.categoryid)

  res.json(rows)
}

const newTag = async (req, res) => {
  const { name, categoryId } = req.body

  // execute will internally call prepare and query
  const [results, err] = await pool.execute('insert into Tag(name, category_id) values(?, ?)', [name, categoryId])

  if (err) {
    console.log(err)
  }

  // If you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance
  res.json(results)
}

export { tagsByCategory, newTag }
