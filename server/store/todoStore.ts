import type { Todo } from '../models/todo.js'

const todos: Todo[] = []

export const getTodos = (): Todo[] => todos

export const addTodo = (payload: Omit<Todo, 'id'>): Todo => {
    const todo: Todo = {
        id: Date.now(),
        text: payload.text,
        completed: payload.completed,
    }

    todos.push(todo)
    return todo
}

export const updateTodo = (
    id: number,
    updates: Partial<Omit<Todo, 'id'>>,
): Todo | null => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) {
        return null
    }

    if (typeof updates.text === 'string') {
        todo.text = updates.text
    }

    if (typeof updates.completed === 'boolean') {
        todo.completed = updates.completed
    }

    return todo
}

export const removeTodo = (id: number): boolean => {
    const index = todos.findIndex((item) => item.id === id)
    if (index === -1) {
        return false
    }

    todos.splice(index, 1)
    return true
}
