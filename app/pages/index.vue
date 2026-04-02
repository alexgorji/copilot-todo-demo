<!-- AI-generated: GitHub Copilot Agent -->
<template>
  <div class="max-w-lg mx-auto mt-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Todo List</h1>
    <form class="flex gap-2 mb-6" @submit.prevent="submit">
      <input
        v-model="newTitle"
        type="text"
        placeholder="New todo..."
        class="flex-1 border rounded px-3 py-1"
      />
      <button type="submit" class="px-4 py-1 bg-blue-500 text-white rounded">Add</button>
    </form>
    <ul class="space-y-2">
      <li
        v-for="todo in store.todos"
        :key="todo.id"
        class="flex items-center gap-2 p-2 border rounded"
        :class="{ 'line-through text-gray-400': todo.completed }"
      >
        <span class="cursor-pointer flex-1" @click="store.toggleTodo(todo.id)">{{ todo.title }}</span>
        <span class="text-sm">{{ todo.completed ? 'Completed' : 'Pending' }}</span>
        <button type="button" class="text-red-500 text-sm" @click="store.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '../stores/todos'

const store = useTodosStore()
await store.fetchTodos()

const newTitle = ref('')

async function submit() {
  const title = newTitle.value.trim()
  if (!title) return
  await store.createTodo(title)
  newTitle.value = ''
}
</script>
