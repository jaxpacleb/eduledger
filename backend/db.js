import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

try {
    const conn = await pool.getConnection();
    console.log('Connection success!')
    conn.release();
} catch (err) {
    console.log(err)
}

export default pool;