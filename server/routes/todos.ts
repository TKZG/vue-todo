import { Router } from 'express'
import { addTodo, getTodos, removeTodo, updateTodo } from '../store/todoStore.js'

const router = Router()

router.get('/', (req, res) => {
    res.json(getTodos())
})

router.post('/', (req, res) => {
    const body = req.body as { text?: string; completed?: boolean }

    if (typeof body.text !== 'string' || !body.text.trim()) {
        return res.status(400).json({ error: 'text is required' })
    }

    const todo = addTodo({
        text: body.text.trim(),
        completed: Boolean(body.completed),
    })

    res.status(201).json(todo)
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body as { text?: string; completed?: boolean }

    if (!Number.isFinite(id)) {
        return res.status(400).json({ error: 'invalid id' })
    }

    const todo = updateTodo(id, {
        text: typeof body.text === 'string' ? body.text.trim() : undefined,
        completed: typeof body.completed === 'boolean' ? body.completed : undefined,
    })

    if (!todo) {
        return res.status(404).json({ error: 'todo not found' })
    }

    res.json(todo)
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isFinite(id)) {
        return res.status(400).json({ error: 'invalid id' })
    }

    if (!removeTodo(id)) {
        return res.status(404).json({ error: 'todo not found' })
    }

    res.status(204).send()
})

export default router
