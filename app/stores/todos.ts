// AI-generated: GitHub Copilot Agent
import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])

  async function fetchTodos() {
    todos.value = await $fetch<Todo[]>('/api/todos')
  }

  async function createTodo(title: string) {
    const todo = await $fetch<Todo>('/api/todos', { method: 'POST', body: { title } })
    todos.value.push(todo)
  }

  async function toggleTodo(id: number) {
    const updated = await $fetch<Todo>(`/api/todos/${id}/toggle`, { method: 'PATCH' })
    const idx = todos.value.findIndex(t => t.id === id)
    if (idx !== -1) todos.value[idx] = updated
  }

  async function deleteTodo(id: number) {
    await $fetch(`/api/todos/${id}`, { method: 'DELETE' })
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return { todos, fetchTodos, createTodo, toggleTodo, deleteTodo }
})
