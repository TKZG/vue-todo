import express from 'express'
import cors from 'cors'
import todosRouter from './routes/todos.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)

app.use(cors())
app.use(express.json())
app.use('/api/todos', todosRouter)

app.listen(port, () => {
    console.log(`Express server running: http://localhost:${port}`)
})
