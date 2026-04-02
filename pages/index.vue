<!-- AI-generated: GitHub Copilot Agent -->
<template>
  <div class="max-w-lg mx-auto mt-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Todo List</h1>
    <ul class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center gap-2 p-2 border rounded"
        :class="{ 'line-through text-gray-400': todo.completed }"
      >
        <span>{{ todo.title }}</span>
        <span class="ml-auto text-sm">{{ todo.completed ? 'Completed' : 'Pending' }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number
  title: string
  completed: boolean
}

const { data: todos } = await useFetch<Todo[]>('/api/todos')
</script>
