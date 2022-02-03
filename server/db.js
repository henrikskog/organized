import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connConf = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}
const pool = mysql.createPool(connConf)

export default pool
