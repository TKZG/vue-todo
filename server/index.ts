import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import todosRouter from './routes/todos.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envLocalPath = path.join(__dirname, '..', '.env.local')
const envPath = path.join(__dirname, '..', '.env')

// .env.local が存在すればそれを読む、なければ .env を読む
const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath
dotenv.config({ path: envFile })

const app = express()
const port = Number(process.env.PORT ?? 3000)

app.use(cors())
app.use(express.json())
app.use('/api/todos', todosRouter)

app.listen(port, () => {
    console.log(`Express server running: http://localhost:${port}`)
})
