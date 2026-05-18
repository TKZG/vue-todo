export type Todo = {
    id: number
    text: string
    completed: boolean
}

export type TodoCreatePayload = {
    text: string
    completed: boolean
}

export type TodoUpdatePayload = Partial<Pick<Todo, 'text' | 'completed'>>

const baseUrl = '/api/todos'

// 共通の fetch 処理: ネットワークの結果を受け取って JSON を返す
const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(url, init)
    if (!response.ok) {
        const body = await response.text()
        throw new Error(`API error ${response.status}: ${body}`)
    }
    return response.json()
}

// Todo 一覧を取得する
export const fetchTodos = (): Promise<Todo[]> => request<Todo[]>(baseUrl)

// 新しい Todo をサーバーに追加する
export const createTodo = (payload: TodoCreatePayload): Promise<Todo> =>
    request<Todo>(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

// Todo の内容を更新する
export const updateTodo = (id: number, payload: TodoUpdatePayload): Promise<Todo> =>
    request<Todo>(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

// Todo を削除する
export const deleteTodo = (id: number): Promise<void> =>
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok && response.status !== 204) {
            throw new Error(`API error ${response.status}`)
        }
    })
