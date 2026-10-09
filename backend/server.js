import pool from '../backend/db.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const [row] = await pool.query('select role from user_account WHERE username = ? AND password = ?',
        [username, password])


    try {
        if (row.length == 0) {
            return res.status(404).json({ message: 'No account found!' })
        }

        return res.status(200).json({ message: 'Login successful!', role: row[0].role })
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in' })
    }
})
const PORT = 5000
app.listen(PORT, () => {
    console.log('Port is running in PORT ' + PORT);
})