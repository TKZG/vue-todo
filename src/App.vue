<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Todo = {
  id: number
  text: string
  completed: boolean
}

// --- state ---
const newTodo = ref<string>('')
const todos = ref<Todo[]>([])

// --- ローカルストレージ読み込み ---
const saved = localStorage.getItem('todos')
if (saved) {
  try {
    todos.value = JSON.parse(saved)
  } catch {
    todos.value = []
  }
}

// --- 追加 ---
const addTodo = () => {
  if (!newTodo.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    completed: false,
  })

  newTodo.value = ''
}

// --- 削除 ---
const removeTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

// --- 残り件数 ---
const remaining = computed(() => todos.value.filter((todo) => !todo.completed).length)

// --- 変更を保存 ---
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true },
)
</script>

<template>
  <div class="container">
    <h1>📝 ToDoアプリ</h1>

    <div class="input-area">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="タスクを入力" />
      <button @click="addTodo">追加</button>
    </div>

    <p>残り: {{ remaining }} 件</p>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ done: todo.completed }">
            {{ todo.text }}
          </span>
        </label>
        <button @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 40px auto;
  font-family: sans-serif;
}

.input-area {
  display: flex;
  gap: 8px;
}

input[type='text'],
input {
  flex: 1;
  padding: 6px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
