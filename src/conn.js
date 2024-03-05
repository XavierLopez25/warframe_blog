import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'xavierlopez25',
  database: 'blog_db',
  password: '123',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
