import { Request, Response } from 'express'
import { prisma } from '../db'

export class TodoController {
    async getTodos(req: Request, res: Response) {
        try {
            const todos = await prisma.todo.findMany({
                orderBy: { createdAt: 'desc' },
            })
            res.json(todos)
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch todos' })
        }
    }

    async createTodo(req: Request, res: Response) {
        const { text, completed } = req.body

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'text is required' })
        }

        try {
            const todo = await prisma.todo.create({
                data: {
                    text,
                    completed: completed ?? false,
                },
            })
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create todo' })
        }
    }

    async updateTodo(req: Request, res: Response) {
        const { id } = req.params
        const { text, completed } = req.body

        if (!Number.isFinite(Number(id))) {
            return res.status(400).json({ error: 'invalid id' })
        }

        try {
            const todo = await prisma.todo.update({
                where: { id: Number(id) },
                data: {
                    ...(text !== undefined && { text: typeof text === 'string' ? text.trim() : text }),
                    ...(completed !== undefined && { completed }),
                },
            })
            res.json(todo)
        } catch (err) {
            res.status(404).json({ error: "Todo can't update" })
        }
    }

    async deleteTodo(req: Request, res: Response) {
        const { id } = req.params

        if (!Number.isFinite(Number(id))) {
            return res.status(400).json({ error: 'invalid id' })
        }

        try {
            await prisma.todo.delete({
                where: { id: Number(id) },
            })
            res.status(204).send()
        } catch (err) {
            res.status(404).json({ error: "Todo can't delete" })
        }
    }
}

export const todoController = new TodoController()