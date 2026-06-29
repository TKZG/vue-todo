<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api/todoApi'

type Todo = {
  id: number
  text: string
  completed: boolean
}

// 新しいタスクの入力内容
const newTodo = ref('')

// サーバーから取得した Todo の一覧
const todos = ref<Todo[]>([])

// 画面に読み込み中を表示するための状態
const loading = ref(false)

// エラーがあればここにメッセージを入れる
const error = ref('')

// ページが表示されたときにサーバーから Todo を取得する
const loadTodos = async () => {
  loading.value = true
  error.value = ''

  try {
    todos.value = await fetchTodos()
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

// 新しいタスクを追加する処理
const addTodo = async () => {
  if (!newTodo.value.trim()) return

  try {
    const created = await createTodo({
      text: newTodo.value.trim(),
      completed: false,
    })
    todos.value.push(created)
    newTodo.value = ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

// チェックボックスを切り替えて完了状態を更新する
const toggleTodo = async (todo: Todo) => {
  try {
    const updated = await updateTodo(todo.id, {
      completed: !todo.completed,
    })
    todo.completed = updated.completed
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

// タスクを削除する処理
const removeTodo = async (id: number) => {
  try {
    await deleteTodo(id)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

// 未完了のタスク数を計算する
const remaining = computed(() => todos.value.filter((todo) => !todo.completed).length)

// Vue がコンポーネントをマウントしたときに最初の読み込みを実行
onMounted(loadTodos)
</script>

<template>
  <div class="container">
    <h1>📝 ToDoアプリ</h1>

    <div class="input-area">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="タスクを入力" />
      <button @click="addTodo">追加</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <p>残り: {{ remaining }} 件</p>
    <p v-if="loading">読み込み中…</p>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <label class="todo-label">
          <input
            class="todo-checkbox"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
          />
          <span class="todo-text" :class="{ done: todo.completed }">{{ todo.text }}</span>
        </label>
        <button class="remove-button" @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 480px;
  margin: 40px auto;
  font-family: sans-serif;
}

.input-area {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.input-area input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.input-area button,
.remove-button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
}

.input-area button {
  background: #2563eb;
  color: white;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.todo-checkbox {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #16a34a;
}

.todo-text {
  color: black;
  flex: 1;
  overflow-wrap: anywhere;
}

.remove-button {
  flex-shrink: 0;
  background: #ef4444;
  color: white;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.error {
  color: #c00;
}
</style>
